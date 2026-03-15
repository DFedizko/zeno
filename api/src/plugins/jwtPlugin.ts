import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { fastifyJwt } from "@fastify/jwt";
import fp from "fastify-plugin";
import type { FastifyReply, FastifyRequest } from "fastify";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";

export const jwtPlugin = fp(async (app: FastifyTypedInstance) => {
	app.register(fastifyJwt, {
		secret: process.env.JWT_SECRET ?? "default-secret",
		cookie: {
			cookieName: "accessToken",
			signed: false,
		},
	});

	app.decorate(
		"jwtAuth",
		async (request: FastifyRequest, _: FastifyReply) => {
			try {
				await request.jwtVerify();
			} catch {
				throw new UnauthorizedError(
					"Unauthorized. Please provide a valid JWT token.",
				);
			}
		},
	);
});
