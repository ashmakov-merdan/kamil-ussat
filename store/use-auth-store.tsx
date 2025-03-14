import { create } from "zustand";

interface AuthStore {
  user: IUser | null
  login: (user: IUser) => void
  logout: () => void
}

const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  login: (user: IUser) => set({ user }),
  logout: () => set({ user: null })
}));

export default useAuthStore;