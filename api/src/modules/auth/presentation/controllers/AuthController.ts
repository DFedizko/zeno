import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginWithPasswordUseCase } from "../../application/usecases/LoginWithPasswordUseCase";
import type { LoginInput } from "@/routes/auth/authSchema";

export class AuthController {
	constructor(
		private readonly loginWithPasswordUseCase: LoginWithPasswordUseCase,
	) {}

	public async loginWithPassword(
		request: FastifyRequest<{ Body: LoginInput }>,
		_: FastifyReply,
	) {
		const result = await this.loginWithPasswordUseCase.execute(request.body);
		return result;
	}
}
