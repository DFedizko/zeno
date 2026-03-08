import { z } from "zod";

const user = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string().nullable(),
	passwordHash: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

const createUserInput = z.object({
	email: z.email(),
	name: z.string().optional(),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters long")
		.optional(),
});

export const userSchema = {
	user,
	input: createUserInput,
	patchInput: createUserInput.partial(),
	params: z.object({
		id: z.string(),
	}),
	output: user.omit({
		passwordHash: true,
		createdAt: true,
		updatedAt: true,
	}),
	userWithPassword: user.omit({
		createdAt: true,
		updatedAt: true,
	}),
};

export type UserInput = z.input<typeof userSchema.input>;
export type UserPatchInput = z.input<typeof userSchema.patchInput>;
export type UserParamsInput = z.input<typeof userSchema.params>;

export type UserOutput = z.output<typeof userSchema.output>;
export type UserWithPasswordOutput = z.output<
	typeof userSchema.userWithPassword
>;
