import { beforeEach, describe, expect, it, vi } from "vitest";
import { UserService } from "./UserService";
import type { IUserRepository } from "../../infrastructure/repositories/IUserRepository";

type MockFn = ReturnType<typeof vi.fn>;

function createMockRepository(): IUserRepository {
	return {
		getUsers: vi.fn(),
		getById: vi.fn(),
		createUser: vi.fn(),
		updateUser: vi.fn(),
		deleteUser: vi.fn(),
		userExistsByEmail: vi.fn(),
	};
}

describe("UserService", () => {
	let userRepository: IUserRepository;
	let userService: UserService;

	beforeEach(() => {
		userRepository = createMockRepository();
		userService = new UserService(userRepository);
	});

	describe("getById", () => {
		it("propagates repository errors unchanged", async () => {
			const id = "550e8400-e29b-41d4-a716-446655440000";
			const error = new Error("User not found.");
			(userRepository.getById as MockFn).mockRejectedValue(error);

			await expect(userService.getById(id)).rejects.toBe(error);
		});
	});

	describe("createUser", () => {
		it("propagates conflict errors unchanged", async () => {
			const input = {
				email: "new@example.com",
				name: "New User",
				password: "secret",
			};
			const error = new Error("User already exists.");
			(userRepository.createUser as MockFn).mockRejectedValue(error);

			await expect(userService.createUser(input)).rejects.toBe(error);
		});
	});
});
