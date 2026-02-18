import { z } from "zod";

const loginInput = z.object({
	email: z.email(),
	password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const authSchema = {
	loginInput,
    loginOutput: z.object({
        id: z.string(),
        email: z.string(),
    }),
    loginResponse: z.object({
        accessToken: z.string(),
    }),
};

export type LoginInput = z.input<typeof authSchema.loginInput>;

export type LoginOutput = z.output<typeof authSchema.loginOutput>;
