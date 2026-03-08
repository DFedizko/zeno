import type { FastifyReply } from "fastify";
import { BaseError } from "./BaseError";
import type { ZodError } from "zod";

export class ValidationError extends BaseError {
    constructor(
        override readonly message: string = "Validation error.",
        public readonly issues?: ZodError["issues"],
    ) {
        super(message, 400);
    }

    public override sendMessage(reply: FastifyReply) {
        return reply.status(this.status).send({
            status: this.status,
            message: this.message,
            issues: this.issues,
        });
    }
}
