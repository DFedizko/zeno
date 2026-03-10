import { describe, expect, it } from "vitest";
import { User } from "./User";

describe("User", () => {
	describe("create", () => {
		it("creates a user with email only", () => {
			const user = User.create("test@example.com");
			expect(user.email).toBe("test@example.com");
			expect(user.name).toBeUndefined();
			expect(user.password).toBeUndefined();
		});

		it("creates a user with email, name and password", () => {
			const user = User.create(
				"test@example.com",
				"John Doe",
				"secret123",
			);
			expect(user.email).toBe("test@example.com");
			expect(user.name).toBe("John Doe");
			expect(user.password).toBe("secret123");
		});

		it("creates a user with optional name only", () => {
			const user = User.create("test@example.com", "Jane");
			expect(user.email).toBe("test@example.com");
			expect(user.name).toBe("Jane");
			expect(user.password).toBeUndefined();
		});
	});

	describe("toOutput", () => {
		it("maps a row to output shape", () => {
			const row = {
				id: "550e8400-e29b-41d4-a716-446655440000",
				email: "user@example.com",
				name: "Test User",
			};
			const output = User.toOutput(row);
			expect(output).toEqual({
				id: row.id,
				email: row.email,
				name: row.name,
			});
		});

		it("handles null name", () => {
			const row = {
				id: "550e8400-e29b-41d4-a716-446655440000",
				email: "user@example.com",
				name: null,
			};
			const output = User.toOutput(row);
			expect(output.name).toBeNull();
		});

		it("does not leak sensitive fields in output", () => {
			const row = {
				id: "550e8400-e29b-41d4-a716-446655440000",
				email: "user@example.com",
				name: "Test User",
				passwordHash: "hashed-secret",
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			const output = User.toOutput(row);
			expect(output).toEqual({
				id: row.id,
				email: row.email,
				name: row.name,
			});
			expect(output).not.toHaveProperty("passwordHash");
			expect(output).not.toHaveProperty("createdAt");
			expect(output).not.toHaveProperty("updatedAt");
		});
	});
});
