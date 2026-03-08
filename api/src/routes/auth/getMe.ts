import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "@/modules/auth/presentation/controllers/AuthController";

export const getMe = (request: FastifyRequest, reply: FastifyReply) => {
	return new AuthController().getUserAuthenticated(request, reply);
};
