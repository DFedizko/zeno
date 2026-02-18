import type { FastifyReply, FastifyRequest } from "fastify";
import type { IUserService } from "../../application/services/IUserService";
import type {
	UserInput,
	UserParamsInput,
	UserPatchInput,
} from "@/routes/user/userSchema";

export class UserController {
	constructor(private readonly userService: IUserService) {}

	public async getUsers(_request: FastifyRequest, reply: FastifyReply) {
		const users = await this.userService.getUsers();
		return reply.status(200).send(users);
	}

	public async getUserById(
		request: FastifyRequest<{ Params: UserParamsInput }>,
		reply: FastifyReply,
	) {
		const { id } = request.params;
		const user = await this.userService.getById(id);
		return reply.status(200).send(user);
	}

	public async createUser(
		request: FastifyRequest<{ Body: UserInput }>,
		reply: FastifyReply,
	) {
		const { name, email, password } = request.body;
		const user = await this.userService.createUser({
			name,
			email,
			password,
		});
		return reply.status(201).send(user);
	}

	public async updateUser(
		request: FastifyRequest<{
			Params: UserParamsInput;
			Body: UserPatchInput;
		}>,
		reply: FastifyReply,
	) {
		const { id } = request.params;
		const { email, name, password } = request.body;
		const user = await this.userService.updateUser(id, {
			email,
			name,
			password,
		});
		return reply.status(200).send(user);
	}

	public async deleteUser(
		request: FastifyRequest<{ Params: UserParamsInput }>,
		reply: FastifyReply,
	) {
		const { id } = request.params;
		await this.userService.deleteUser(id);
		return reply.status(204).send();
	}
}
