import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cartState = atom({
  key: "cartState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const getTotalCartPrice = selector({
  key: "getTotalCartPrice",
  get: ({ get }) => {
    const items = get(cartState);
    return items.reduce((acc: number, item: any) => acc + item.price, 0);
  },
});
