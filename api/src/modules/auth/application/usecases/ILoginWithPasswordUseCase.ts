import type { LoginInput, LoginOutput } from "@/routes/auth/authSchema";

export interface ILoginWithPasswordUseCase {
    execute(input: LoginInput): Promise<LoginOutput>;
}
