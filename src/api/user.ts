import axios from "../plugins/axios";

export function userLogin(payload: any) {
  return new Promise(async (resolve, reject) => {
    const res: any = await axios.post("https://fakestoreapi.com/auth/login", payload);

    if (res?.response?.status == 401) {
      reject(res);
    } else resolve(res);
  });
}
