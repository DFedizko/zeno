import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { ValidationError } from "../shared/errors/ValidationError";
import { BaseError } from "../shared/errors/BaseError";
import fp from "fastify-plugin";;

export const errorHandler = fp(async (app: FastifyTypedInstance) => {
	app.setErrorHandler((error, _, reply) => {
		if (error instanceof ValidationError) {
			return error.sendMessage(reply);
		}

		if (error instanceof BaseError) {
			return error.sendMessage(reply);
		}

		return new BaseError().sendMessage(reply);
	});
});
