import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: User;
  setUser: (newData: Partial<User>) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  resetUser: () => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: {
        email: "",
        uid: "",
        displayName: "",
        photoURL: "",
      },
      isLoading: false,
      setIsLoading: (value) => set({ isLoading: value }),
      setUser: (newData) =>
        set((state) => ({ user: { ...state.user, ...newData } })),
      resetUser: () => set({ user: { email: "", uid: "", displayName: "", photoURL: "" } }),
    }),
    { name: "userState" }
  )
);

export default useUserStore;
