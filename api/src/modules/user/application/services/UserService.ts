import type { IUserService } from "./IUserService";
import type { IUserRepository } from "../../infrastructure/repositories/IUserRepository";
import type {
	UserInput,
	UserOutput,
	UserPatchInput,
} from "@/routes/user/userSchema";

export class UserService implements IUserService {
	constructor(private readonly userRepository: IUserRepository) {}

	async getUsers(): Promise<UserOutput[]> {
		return await this.userRepository.getUsers();
	}

	async getById(id: string): Promise<UserOutput> {
		return await this.userRepository.getById(id);
	}

	async createUser(input: UserInput): Promise<UserOutput> {
		return await this.userRepository.createUser({
			email: input.email,
			name: input.name,
			password: input.password,
		});
	}

	async updateUser(id: string, input: UserPatchInput): Promise<UserOutput> {
		return await this.userRepository.updateUser(id, input);
	}

	async deleteUser(id: string): Promise<void> {
		return await this.userRepository.deleteUser(id);
	}
}
