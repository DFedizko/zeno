import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { ValidationError } from "../shared/errors/ValidationError";
import { BaseError } from "../shared/errors/BaseError";
import fp from "fastify-plugin";
import {
	hasZodFastifySchemaValidationErrors,
	isResponseSerializationError,
} from "fastify-type-provider-zod";
import { InvalidResponseError } from "@/shared/errors/InvalidResponseError";

export const errorHandler = fp(async (app: FastifyTypedInstance) => {
	app.setErrorHandler((error, _, reply) => {
		if (error instanceof ValidationError) {
			return error.sendMessage(reply);
		}

		if (error instanceof BaseError) {
			return error.sendMessage(reply);
		}

		if (hasZodFastifySchemaValidationErrors(error)) {
			return new ValidationError(error.message).sendMessage(reply);
		}

		if (isResponseSerializationError(error)) {
			return new InvalidResponseError(
				error.message,
				error.cause.issues,
			).sendMessage(reply);
		}

		return new BaseError().sendMessage(reply);
	});
});
