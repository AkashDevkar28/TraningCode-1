import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",

  login: (username, password) => {
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("isAuthenticated");
    set({ isAuthenticated: false });
  },
}));
