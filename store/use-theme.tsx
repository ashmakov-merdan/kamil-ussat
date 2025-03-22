import { create } from "zustand"
import { persist } from "zustand/middleware";

interface ThemeStore {
  isDark: boolean
  switchTheme: (theme: "light" | "dark") => void
}

const useTheme = create<ThemeStore>()(
  persist(
    (set) => ({
      isDark: false,
      switchTheme: (theme) => set(() => ({
        isDark: theme === "dark" ? true : false
      }))
    }),
    {
      name: "theme",
      partialize: (state) => ({
        isDark: state.isDark
      })
    }
  )
);

export default useTheme;