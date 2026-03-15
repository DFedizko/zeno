import { create } from "zustand";

interface UserState {
	id: string;
	name: string;
	email: string;
	setUser: (user: { id: string; name: string | null; email: string }) => void;
	clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
	id: "",
	name: "",
	email: "",
	setUser: (user) =>
		set({ id: user.id, name: user.name ?? "", email: user.email }),
	clearUser: () => set({ id: "", name: "", email: "" }),
}));
