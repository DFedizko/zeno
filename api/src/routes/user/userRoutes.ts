import { z } from "zod";
import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { getUsers } from "./getUsers";
import { getUserById } from "./getUserById";
import { postCreateUser } from "./postCreateUser";
import { patchUpdateUser } from "./patchUpdateUser";
import { deleteUser } from "./deleteUser";
import { userSchema } from "./userSchema";
import { ErrorResponseSchemas } from "@/shared/schemas/ErrorResponseSchemas";

export const userRoutes = async (app: FastifyTypedInstance) => {
	app.get(
		"",
		{
			schema: {
				tags: ["user"],
				description: "List all users",
				response: {
					200: z.array(userSchema.output),
				},
			},
		},
		getUsers,
	);
	app.get(
		"/:id",
		{
			schema: {
				tags: ["user"],
				description: "Get a user by id",
				params: userSchema.params,
				response: {
					200: userSchema.output,
					404: ErrorResponseSchemas.notFound.describe(
						"User not found.",
					),
				},
			},
		},
		getUserById,
	);
	app.patch(
		"/:id",
		{
			schema: {
				tags: ["user"],
				description: "Update a user by id",
				params: userSchema.params,
				body: userSchema.patchInput,
				response: {
					200: userSchema.output,
					400: ErrorResponseSchemas.validationError,
					404: ErrorResponseSchemas.notFound.describe(
						"User not found.",
					),
				},
			},
		},
		patchUpdateUser,
	);
	app.post(
		"",
		{
			schema: {
				tags: ["user"],
				description: "Create a new user",
				body: userSchema.input,
				response: {
					201: userSchema.output,
					400: ErrorResponseSchemas.validationError,
					409: ErrorResponseSchemas.conflict.describe(
						"User already exists.",
					),
				},
			},
		},
		postCreateUser,
	);
	app.delete(
		"/:id",
		{
			schema: {
				tags: ["user"],
				description: "Delete a user by id",
				params: userSchema.params,
				response: {
					204: z.undefined(),
					404: ErrorResponseSchemas.notFound.describe(
						"User not found.",
					),
				},
			},
		},
		deleteUser,
	);
};
