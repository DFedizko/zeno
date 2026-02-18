import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginInput } from "./authSchema";
import { LoginWithPasswordUseCase } from "@/modules/auth/application/usecases/LoginWithPasswordUseCase";
import { UserRepository } from "@/modules/user/infrastructure/repositories/UserRepository";
import { AuthController } from "@/modules/auth/presentation/controllers/AuthController";

export const postLogin = async (
	request: FastifyRequest<{ Body: LoginInput }>,
	reply: FastifyReply,
) => {
	const { id, email } = await new AuthController(
		new LoginWithPasswordUseCase(new UserRepository()),
	).loginWithPassword(request, reply);

	const jwtAccessToken = await request.server.jwt.sign({
		id,
		email,
	});

	return reply.status(200).send({
		accessToken: jwtAccessToken,
	});
};
