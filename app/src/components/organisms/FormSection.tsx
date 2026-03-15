import { Mail, Lock } from "lucide-react";
import { InputGroup } from "@/components/molecules/InputGroup";
import { RememberRow } from "@/components/molecules/RememberRow";
import type { UseFormRegister } from "react-hook-form";

interface LoginFormValues {
	email: string;
	password: string;
}

interface FormSectionProps {
	register: UseFormRegister<LoginFormValues>;
	rememberMe: boolean;
	onRememberChange: (checked: boolean) => void;
	onForgotPassword?: () => void;
}

export const FormSection = ({
	register,
	rememberMe,
	onRememberChange,
	onForgotPassword,
}: FormSectionProps) => (
	<div className="flex flex-col gap-5 w-full">
		<InputGroup
			label="Email"
			icon={Mail}
			type="email"
			placeholder="you@example.com"
			autoComplete="email"
			{...register("email")}
		/>
		<InputGroup
			label="Password"
			icon={Lock}
			type="password"
			placeholder="••••••••"
			autoComplete="current-password"
			{...register("password")}
		/>
		<RememberRow
			checked={rememberMe}
			onCheckedChange={onRememberChange}
			onForgotPassword={onForgotPassword}
		/>
	</div>
);
