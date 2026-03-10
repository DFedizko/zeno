import { prisma } from "@/database/prisma";
import type { IUserRepository } from "./IUserRepository";
import { User } from "../../domain/entities/User";
import type {
	UserInput,
	UserOutput,
	UserPatchInput,
	UserWithPasswordOutput,
} from "@/routes/user/userSchema";
import { randomUUID } from "node:crypto";
import { hashPassword } from "@/shared/utils/hashPassword";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import { UserNotFound } from "../errors/UserNotFound";

export class UserRepository implements IUserRepository {
	public async getUsers(): Promise<UserOutput[]> {
		const users = await prisma.user.findMany({});
		return users.map(User.toOutput);
	}

	public async getById(id: string): Promise<UserOutput> {
		const user = await prisma.user.findUnique({
			where: { id },
		});
		if (!user) throw new UserNotFound();
		return User.toOutput(user);
	}

	public async findByEmail(email: string): Promise<UserWithPasswordOutput> {
		const userWithPassword = await prisma.user.findUnique({
			where: { email },
		});

		if (!userWithPassword) {
			throw new UserNotFound("User not found with this email.");
		}

		if (!userWithPassword.passwordHash) {
			throw new UserNotFound("User has no password.");
		}

		return User.toWithPasswordOutput({
			id: userWithPassword.id,
			email: userWithPassword.email,
			name: userWithPassword.name,
			passwordHash: userWithPassword.passwordHash,
		});
	}

	public async createUser(input: UserInput): Promise<UserOutput> {
		const userExists = await this.userExistsByEmail(input.email);

		if (userExists) {
			throw new UserAlreadyExists("User already exists with this email.");
		}

		const newUser = User.create(input.email, input.name, input.password);

		const created = await prisma.user.create({
			data: {
				id: randomUUID(),
				name: newUser.name,
				email: newUser.email,
				passwordHash: newUser.password
					? await hashPassword(newUser.password)
					: undefined,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});
		return User.toOutput(created);
	}

	public async updateUser(
		id: string,
		input: UserPatchInput,
	): Promise<UserOutput> {
		const existing = await prisma.user.findUnique({
			where: { id },
		});
		if (!existing) throw new UserNotFound();

		if (input.email && input.email !== existing.email) {
			const emailTaken = await this.userExistsByEmail(input.email);
			if (emailTaken) {
				throw new UserAlreadyExists(
					"User already exists with this email.",
				);
			}
		}

		const updated = await prisma.user.update({
			where: { id },
			data: {
				email: input.email,
				name: input.name,
				passwordHash: input.password
					? await hashPassword(input.password)
					: null,
			},
		});
		return User.toOutput(updated);
	}

	public async deleteUser(id: string): Promise<void> {
		const existing = await prisma.user.findUnique({
			where: { id },
		});
		if (!existing) throw new UserNotFound("User not found.");

		await prisma.user.delete({
			where: { id },
		});
	}

	public async userExistsByEmail(email: string): Promise<boolean> {
		const user = await prisma.user.findUnique({
			where: { email },
		});
		return user !== null;
	}
}
