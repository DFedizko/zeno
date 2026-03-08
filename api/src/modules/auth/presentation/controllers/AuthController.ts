import type { FastifyReply, FastifyRequest } from "fastify";
import type { LoginWithPasswordUseCase } from "../../application/usecases/LoginWithPasswordUseCase";
import type { LoginInput } from "@/routes/auth/authSchema";
import { UnauthorizedError } from "@/shared/errors/UnauthorizedError";
import type { UserOutput } from "@/routes/user/userSchema";

const THIRTY_DAYS_IN_SECONDS = 60 * 60 * 24 * 30;
export class AuthController {
	constructor(
		private readonly loginWithPasswordUseCase?: LoginWithPasswordUseCase,
	) {}

	public async getUserAuthenticated(request: FastifyRequest, reply: FastifyReply) {
		const user = request.user as UserOutput;
		if (!user.id) {
			throw new UnauthorizedError(
				"Invalid cookie. JWT token is missing or invalid.",
			);
		}

		return reply.status(200).send(user);
	}

	public async loginWithPassword(
		request: FastifyRequest<{ Body: LoginInput }>,
		reply: FastifyReply,
	) {
		const { id, email, name } = await this.loginWithPasswordUseCase!.execute(
			request.body,
		);

		const jwtAccessToken = await request.server.jwt.sign({
			id,
			email,
			name,
		});

		return reply
			.status(200)
			.setCookie("accessToken", jwtAccessToken, {
				httpOnly: true,
				sameSite: "strict",
				maxAge: THIRTY_DAYS_IN_SECONDS,
			})
			.send({
				status: 200,
				message: "Login successful",
			});
	}
}
