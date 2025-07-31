import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserLogged } from "../types/User.types";

interface AuthState {
    user: UserLogged | null;
    setUser: (user: UserLogged) => void;
    logout: () => void;
    _hasHydrated: boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
    user: null,
    setUser: (user) => set({ user }), 
    logout: () => set({ user: null }),
      _hasHydrated: false,
  }),
  {
    name: "auth-storage", 
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      state!._hasHydrated = true; 
    },
  }
  )


);
