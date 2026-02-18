import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { postLogin } from "./postLogin";
import { authSchema } from "./authSchema";

export const authRoutes = async (app: FastifyTypedInstance) => {
	app.post("/login", {
		schema: {
			tags: ["auth"],
			description: "Login with email and password",
			body: authSchema.loginInput,
			response: {
				200: authSchema.loginResponse,
			},
		},
	}, postLogin);
};
