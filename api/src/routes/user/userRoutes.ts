import { z } from "zod";
import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { getUsers } from "./getUsers";
import { getUserById } from "./getUserById";
import { postCreateUser } from "./postCreateUser";
import { patchUpdateUser } from "./patchUpdateUser";
import { deleteUser } from "./deleteUser";
import { userSchema } from "./userSchema";

export const userRoutes = async (app: FastifyTypedInstance) => {
	app.get(
		"/user",
		{
			schema: {
				tags: ["user"],
				description: "List all users",
				headers: z.object({
					"Bearer Authorization": z.string().describe("JWT token"),
				}),
				response: {
					200: z.array(userSchema.output),
				},
			},
			onRequest: [app.jwtAuth],
		},
		getUsers,
	);
	app.get(
		"/user/:id",
		{
			schema: {
				tags: ["user"],
				description: "Get a user by id",
				params: userSchema.params,
				response: {
					200: userSchema.output,
				},
			},
		},
		getUserById,
	);
	app.patch(
		"/user/:id",
		{
			schema: {
				tags: ["user"],
				description: "Update a user by id",
				params: userSchema.params,
				body: userSchema.patchInput,
				response: {
					200: userSchema.output,
				},
			},
		},
		patchUpdateUser,
	);
	app.post(
		"/user",
		{
			schema: {
				tags: ["user"],
				description: "Create a new user",
				body: userSchema.input,
				response: {
					201: userSchema.output,
				},
			},
		},
		postCreateUser,
	);
	app.delete(
		"/user/:id",
		{
			schema: {
				tags: ["user"],
				description: "Delete a user by id",
				params: userSchema.params,
				response: {
					204: z.undefined(),
				},
			},
		},
		deleteUser,
	);
};
