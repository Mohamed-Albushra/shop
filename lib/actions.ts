import { Product } from "./interfaces";

const BASE_URL = "https://dummyjson.com/products"
export async function getSearchedProducts(query: string) {
  try {
    const response = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await response.json();
    return data.products as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getAllProducts() {
  try {
    const response = await fetch(BASE_URL+'?limit=0');
    const data = await response.json();
    return data.products as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}