import axios from "../plugins/axios";

export async function userLogin() {
  return await axios.get("https://fakestoreapi.com/users/1");
}
