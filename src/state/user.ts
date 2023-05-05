import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export interface UserInfo {
  id: number;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

export const userState = atom({
  key: "userState",
  default: {} as UserInfo,
  effects_UNSTABLE: [persistAtom],
});
