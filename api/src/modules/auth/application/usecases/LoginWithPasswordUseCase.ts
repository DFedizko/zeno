import type { IUserRepository } from "@/modules/user/infrastructure/repositories/IUserRepository";
import type { ILoginWithPasswordUseCase, LoginOutput } from "./ILoginWithPasswordUseCase";
import type { LoginInput } from "@/routes/auth/authSchema";
import { verifyPassword } from "@/shared/utils/verifyPassword";
import { PasswordNotSetError } from "@/shared/errors/PasswordNotSetError";
import { InvalidCredentialsError } from "@/shared/errors/InvalidCredentialsError";

export class LoginWithPasswordUseCase implements ILoginWithPasswordUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	public async execute(input: LoginInput): Promise<LoginOutput> {
		const user = await this.userRepository.findByEmail(input.email);

		if (!user.passwordHash) throw new PasswordNotSetError();

		const isValidPassword = await verifyPassword(
			input.password,
			user.passwordHash,
		);

		if (!isValidPassword) {
			throw new InvalidCredentialsError("Invalid password.");
        }

        return {
            id: user.id,
            email: user.email,
			name: user.name,
        };
	}
}
