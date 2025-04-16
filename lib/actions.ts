import { Product } from "./interfaces";

const BASE_URL = "https://dummyjson.com/products";
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
    const response = await fetch(BASE_URL + "?limit=0");
    const data = await response.json();
    return data.products as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    const response = await fetch(BASE_URL + "/category-list");
    const data = await response.json();
    const capitalizedCategories = data.map((category: string) => category.charAt(0).toUpperCase() + category.slice(1));
    return capitalizedCategories as string[];
  } catch (error) {
    console.error("Error fetching Categories:", error);
    return [];
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const response = await fetch(BASE_URL + "/category/" + category);
    const data = await response.json();
    return data.products as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: number) {
  try {
    const response = await fetch(BASE_URL + "/" + id);
    const data = await response.json();
    return data as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getProductsByBrand(brand: string) {
  try {
    const response = await fetch(BASE_URL + "?limit=0");
    const data = await response.json();
    const products = data.products as Product[];
    const filteredProducts = products.filter(product => product.brand === brand);
    return filteredProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
} 

export async function getProductsByTag(tag: string) {
  try {
    const response = await fetch(BASE_URL + "?limit=0");
    const data = await response.json();
    const products = data.products as Product[];
    const filteredProducts = products.filter(product => product.tags.includes(tag));
    return filteredProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}