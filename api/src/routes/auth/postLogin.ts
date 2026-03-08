import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginInput } from "./authSchema";
import { LoginWithPasswordUseCase } from "@/modules/auth/application/usecases/LoginWithPasswordUseCase";
import { UserRepository } from "@/modules/user/infrastructure/repositories/UserRepository";
import { AuthController } from "@/modules/auth/presentation/controllers/AuthController";

export const postLogin = (
	request: FastifyRequest<{ Body: LoginInput }>,
	reply: FastifyReply,
) => {
	return new AuthController(
		new LoginWithPasswordUseCase(new UserRepository()),
	).loginWithPassword(request, reply);
};
