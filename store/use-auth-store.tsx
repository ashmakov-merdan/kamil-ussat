import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: IUser | null
  setUser: (user: IUser | null) => void
}

const useAuthStore = create<AuthStore>()((
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set(() => ({
        user
      }))
    }),
    {
      name: "auth",
      partialize: (state) => ({
        user: state.user
      })
    }
  )
));

export default useAuthStore;