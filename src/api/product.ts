import axios from "../plugins/axios";
import { Product } from "../types/product";

export function getProductList(): Promise<Product[]> {
  return axios.get("https://fakestoreapi.com/products");
}
export function getProductDetail(params: any): Promise<Product> {
  return axios.get(`https://fakestoreapi.com/products/${params}`);
}
