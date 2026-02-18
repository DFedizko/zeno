import type {
	UserInput,
	UserOutput,
	UserPatchInput,
	UserWithPasswordOutput,
} from "@/routes/user/userSchema";

export interface IUserRepository {
	getUsers(): Promise<UserOutput[]>;
	getById(id: string): Promise<UserOutput>;
	findByEmail(email: string): Promise<UserWithPasswordOutput>;
	createUser(input: UserInput): Promise<UserOutput>;
	updateUser(id: string, input: UserPatchInput): Promise<UserOutput>;
	deleteUser(id: string): Promise<void>;
	userExistsByEmail(email: string): Promise<boolean>;
}
