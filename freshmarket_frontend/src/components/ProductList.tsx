import { fetchProducts } from "@/api/product";
import type { Product } from "@/types/alltypes";
import React, { useEffect, useState } from "react";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setFilteredProduct(data);
    });
  }, []);

  const handleAddToCart = (product: Product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (!exists) setCart([...cart, product]);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleSearch = () => {
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProduct(results);
  };

  const handleFilter = () => {
    if (!filterCategory) setFilteredProduct(products);
    else {
      const result = products.filter(
        (p) => p.category.toLowerCase() === filterCategory.toLowerCase()
      );
      setFilteredProduct(result);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
        Fresh Market
      </h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex gap-2 w-full sm:w-1/2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>

        <div className="flex gap-2 w-full sm:w-1/3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
          >
            <option value="">All Categories</option>
            <option value="Fruit">Fruits</option>
            <option value="Vegetable">Vegetables</option>
          </select>
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="flex flex-col lg:flex-row gap-8 max-w-4/5 mx-auto">
        {/* Products Section */}
        <div className="flex-1 lg:w-2/3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProduct.map((p) => (
              <div
                key={p.id}
                className="group bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col gap-4">
                  <h2 className="text-xl font-semibold text-gray-900 truncate">
                    {p.name}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-3 min-h-[60px]">
                    {p.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xl font-bold text-green-700">
                      Ksh {p.price.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="lg:w-1/3 bg-white rounded-2xl shadow-md p-6 h-fit sticky top-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">No items in your cart.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-green-600">
                      Ksh {item.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <p className="text-lg font-semibold text-gray-900">
                  Total:{" "}
                  <span className="text-green-700">
                    Ksh{" "}
                    {cart
                      .reduce((sum, item) => sum + Number(item.price), 0)
                      .toLocaleString()}
                  </span>
                </p>
                <button className="w-full mt-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
