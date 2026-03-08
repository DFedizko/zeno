import type { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "@/modules/user/presentation/controllers/UserController";
import { UserService } from "@/modules/user/application/services/UserService";
import { UserRepository } from "@/modules/user/infrastructure/repositories/UserRepository";
import type { UserParamsInput } from "./userSchema";

export const getUserById = (
	request: FastifyRequest<{ Params: UserParamsInput }>,
	reply: FastifyReply,
) => {
	return new UserController(new UserService(new UserRepository())).getUserById(
		request,
		reply,
	);
};
