import type { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "@/modules/user/presentation/controllers/UserController";
import { UserService } from "@/modules/user/application/services/UserService";
import { UserRepository } from "@/modules/user/infrastructure/repositories/UserRepository";

export const getUsers = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	return new UserController(new UserService(new UserRepository())).getUsers(
		request,
		reply,
	);
};
