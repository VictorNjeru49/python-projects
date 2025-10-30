import type { Product } from "@/types/alltypes";
import axios from 'axios';

export const API_URL = "http://localhost:8000/api/products/";

// Fetch all products
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};