import type React from "react";
import { useEffect } from "react";
import { useAuthStore, type User } from "./stores/authStore";

export type { User } from "./stores/authStore";

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	refreshSession: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	useEffect(() => {
		useAuthStore.getState().refreshSession();
	}, []);

	return <>{children}</>;
};

export const useAuth = (): AuthState => {
	const user = useAuthStore((s) => s.user);
	const isLoading = useAuthStore((s) => s.isLoading);
	const login = useAuthStore((s) => s.login);
	const logout = useAuthStore((s) => s.logout);
	const refreshSession = useAuthStore((s) => s.refreshSession);

	return {
		isAuthenticated: !!user,
		user,
		isLoading,
		login,
		logout,
		refreshSession,
	};
};
