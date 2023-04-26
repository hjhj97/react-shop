import axios from "../plugins/axios";

export function getProductList() {
  return axios.get("https://fakestoreapi.com/products");
}
export function getProductDetail(params: any) {
  return axios.get(`https://fakestoreapi.com/products/${params}`);
}
