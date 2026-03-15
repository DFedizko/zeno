import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { userRoutes } from "./routes/user/userRoutes";
import { authRoutes } from "./routes/auth/authRoutes";
import { financeRoutes } from "./routes/finance/financeRoutes";

export const routes = async (app: FastifyTypedInstance) => {
	app.register(userRoutes, { prefix: "/user" });
	app.register(authRoutes, { prefix: "/auth" });
	app.register(financeRoutes, { prefix: "/finance" });
};
