import type {
	UserInput,
	UserOutput,
	UserPatchInput,
} from "@/routes/user/userSchema";

export interface IUserService {
	getUsers(): Promise<UserOutput[]>;
	getById(id: string): Promise<UserOutput>;
	createUser(input: UserInput): Promise<UserOutput>;
	updateUser(id: string, input: UserPatchInput): Promise<UserOutput>;
	deleteUser(id: string): Promise<void>;
}
