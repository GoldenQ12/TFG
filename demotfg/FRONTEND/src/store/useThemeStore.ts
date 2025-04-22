import { create } from "zustand";
import { Theme } from "@/interfaces/theme";

export const useThemeStore = create<Theme>((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
    },
}));