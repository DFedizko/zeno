import type { FastifyReply } from "fastify";
import { ValidationError } from "./ValidationError";
import type { ZodError } from "zod";

export class InvalidResponseError extends ValidationError {
	constructor(
		message: string = "Invalid response error.",
		issues: ZodError["issues"],
	) {
		super(message, issues);
	}

	public override sendMessage(reply: FastifyReply) {
		return reply.status(500).send({
			status: 500,
			message: this.message,
			issues: this.issues?.map((issue) => issue.message).join("; "),
		});
	}
}
