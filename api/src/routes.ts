import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { userRoutes } from "./routes/user/userRoutes";
import { authRoutes } from "./routes/auth/authRoutes";

export const routes = async (app: FastifyTypedInstance) => {
	app.register(userRoutes);
	app.register(authRoutes, { prefix: "/auth" });
};
