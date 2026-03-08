import { z } from "zod";

export const defaultResponseSchema = z.object({
	status: z.number(),
	message: z.string(),
});

export const ErrorResponseSchemas = {
	default: defaultResponseSchema,
	validationError: defaultResponseSchema.describe("Validation error."),
	unauthorized: defaultResponseSchema.describe("Unauthorized."),
	notFound: defaultResponseSchema.describe("Not found."),
	invalidCredentials: defaultResponseSchema.describe("Invalid credentials."),
	conflict: defaultResponseSchema.describe("Conflict. Resource already exists."),
} 
