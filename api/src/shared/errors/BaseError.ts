import type { FastifyReply } from "fastify";

export class BaseError extends Error {
	constructor(
		override readonly message: string = "Internal server error.",
		public readonly status: number = 500,
	) {
		super(message);
	}

	public sendMessage(reply: FastifyReply) {
		return reply.status(this.status).send({
			status: this.status,
			message: this.message,
		});
	}
}
