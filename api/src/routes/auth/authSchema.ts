import { defaultResponseSchema } from "@/shared/schemas/ErrorResponseSchemas";
import { z } from "zod";

const loginInput = z.object({
	email: z.email(),
	password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const authSchema = {
	loginInput,
	loginOutput: defaultResponseSchema,
};

export type LoginInput = z.input<typeof authSchema.loginInput>;
