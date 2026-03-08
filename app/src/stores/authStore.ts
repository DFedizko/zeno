import { getApiAuthMe, postApiAuthLogin } from "@/gen";
import { apiClient } from "@/lib/apiClient";
import { create } from "zustand";

export interface User {
	id: string;
	email: string;
	name: string | null;
}

interface AuthStore {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
	refreshSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
	user: null,
	isLoading: true,

	logout: () => set({ user: null }),

	refreshSession: async () => {
		set({ isLoading: true });
		try {
			const user = await getApiAuthMe({ client: apiClient });
			set({ user, isLoading: false });
		} catch {
			set({ user: null, isLoading: false });
		}
	},

	login: async (email, password) => {
		await postApiAuthLogin(
			{ email, password },
			{ client: apiClient },
		);
		await get().refreshSession();
	},
}));
