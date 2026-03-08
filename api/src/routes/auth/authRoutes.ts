import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { postLogin } from "./postLogin";
import { authSchema } from "./authSchema";
import { defaultResponseSchema, ErrorResponseSchemas } from "@/shared/schemas/ErrorResponseSchemas";
import { getMe } from "./getMe";
import { userSchema } from "../user/userSchema";

export const authRoutes = async (app: FastifyTypedInstance) => {
	app.get(
		"/me",
		{
			schema: {
				tags: ["auth"],
				description: "Get the authenticated user",
				response: {
					200: userSchema.output,
					401: ErrorResponseSchemas.unauthorized,
				},
			},
			onRequest: [app.jwtAuth],
		},
		getMe
	);
	app.post(
		"/login",
		{
			schema: {
				tags: ["auth"],
				description:
					"Login with email and password and set the httpOnly cookie with JWT.",
				body: authSchema.loginInput,
				response: {
					200: defaultResponseSchema
						.describe(
							"Success. JWT is set in the httpOnly cookie. Client must send credentials: 'include' in subsequent requests.",
						),
					400: ErrorResponseSchemas.validationError,
					401: ErrorResponseSchemas.invalidCredentials,
					404: ErrorResponseSchemas.notFound.describe("User not found."),
				},
			},
		},
		postLogin,
	);
};
