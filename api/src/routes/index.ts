import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { userRoutes } from "./user/userRoutes";

export const routes = async (app: FastifyTypedInstance) => {
    app.register(userRoutes, { prefix: "/user" });
}
