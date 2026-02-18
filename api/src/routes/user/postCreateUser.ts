import { UserController } from "@/modules/user/presentation/controllers/UserController";
import { UserService } from "@/modules/user/application/services/UserService";
import { UserRepository } from "@/modules/user/infrastructure/repositories/UserRepository";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { UserInput } from "./userSchema";

export const postCreateUser = async (
	request: FastifyRequest<{ Body: UserInput }>,
	reply: FastifyReply,
) => {
	return new UserController(new UserService(new UserRepository())).createUser(
		request,
		reply,
	);
};
