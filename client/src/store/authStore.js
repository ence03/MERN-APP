export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: true }),
  login: async (credentials) => {
    const res = await fetch("http://localhost:7000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await res.json();
    if (data.success) {
      set({ user: data.user, isAuthenticated: true });
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: data.message };
    }
  },
  logout: async () => {
    const res = await fetch("http://localhost:7000/api/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (data.success) {
      set({ user: null, isAuthenticated: false });
      return { success: true, message: "Logged out successfully" };
    } else {
      return { success: false, message: data.message };
    }
  },
  register: async (newUser) => {
    const res = await fetch("http://localhost:7000/api/register", {
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
  },
}));
