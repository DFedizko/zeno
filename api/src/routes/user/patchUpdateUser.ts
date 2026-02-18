import type { FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "@/modules/user/presentation/controllers/UserController";
import { UserService } from "@/modules/user/application/services/UserService";
import { UserRepository } from "@/modules/user/infrastructure/repositories/UserRepository";
import type { UserParamsInput, UserPatchInput } from "./userSchema";

export const patchUpdateUser = async (
	request: FastifyRequest<{
		Params: UserParamsInput;
		Body: UserPatchInput;
	}>,
	reply: FastifyReply,
) => {
	return new UserController(new UserService(new UserRepository())).updateUser(
		request,
		reply,
	);
};
