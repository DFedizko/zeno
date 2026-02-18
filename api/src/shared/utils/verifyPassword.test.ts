import { test, expect } from "vitest";
import { verifyPassword } from "./verifyPassword";
import { hashPassword } from "./hashPassword";

test("verifyPassword should verify a password using bcrypt", async () => {
    const password = "password";
    const hash = await hashPassword(password);
    
    const result = await verifyPassword(password, hash);

    expect(result).toBe(true);
});
