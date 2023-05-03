import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { Product } from "../types/product";

const { persistAtom } = recoilPersist();

export const cartState = atom<Product[]>({
  key: "cartState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const getTotalCartPrice = selector<number>({
  key: "getTotalCartPrice",
  get: ({ get }) => {
    const items = get(cartState);
    return items.reduce((acc: number, item: any) => acc + item.price, 0);
  },
});
