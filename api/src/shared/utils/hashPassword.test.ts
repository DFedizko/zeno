import { hashPassword } from "./hashPassword";
import { test, expect } from "vitest";

test("hashPassword should hash a password using bcrypt", async () => {
	const password = "password";
	const hashedPassword = await hashPassword(password);
	expect(hashedPassword).toBeDefined();
});
