import { create } from "zustand";
import type { User } from "@/types";

type UserActions = {
	setUser: (user: User | null) => void;
	clearUser: () => void;
	updateUser: (updates: Partial<User>) => void;
};

type UserStore = {
	user: User | null;
	isAuthenticated: boolean;
	actions: UserActions;
};

export const useUserStore = create<UserStore>((set) => ({
	user: null,
	isAuthenticated: false,
	actions: {
		setUser: (user) =>
			set(() => ({
				user,
				isAuthenticated: user !== null,
			})),
		clearUser: () =>
			set(() => ({
				user: null,
				isAuthenticated: false,
			})),
		updateUser: (updates) =>
			set((state) => ({
				user: state.user ? { ...state.user, ...updates } : null,
			})),
	},
}));

export const useUser = () => useUserStore((state) => state.user);

export const useIsAuthenticated = () =>
	useUserStore((state) => state.isAuthenticated);

export const useUserActions = () => useUserStore((state) => state.actions);
