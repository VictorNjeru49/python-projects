export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  image: string;
  stock: number;
  available: boolean;
}

export interface category {
  id: number
  name: string
}