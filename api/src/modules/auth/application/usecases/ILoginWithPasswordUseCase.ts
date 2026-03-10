import type { LoginInput } from "@/routes/auth/authSchema";

export interface LoginOutput {
	id: string;
	email: string;
	name: string | null;
}

export interface ILoginWithPasswordUseCase {
	execute(input: LoginInput): Promise<LoginOutput>;
}
