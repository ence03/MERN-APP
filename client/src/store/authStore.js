import { create } from "zustand";
import Cookies from "js-cookie";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: !!Cookies.get("token"),
  token: Cookies.get("token"),
  register: async (newUser) => {
    try {
      const res = await fetch("http://localhost:7000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.success) {
        set({ user: data.user, isAuthenticated: true });
        return { success: true, message: "Registration successful" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  },
  login: async (credentials) => {
    try {
      const res = await fetch("http://localhost:7000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data.success) {
        Cookies.set("token", data.token, { expires: 1 });
        set({ user: data.user, isAuthenticated: true, token: data.token });
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  },
  logout: () => {
    Cookies.remove("token");
    set({ user: null, isAuthenticated: false, token: null });
  },
}));
