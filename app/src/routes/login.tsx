import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	postApiAuthLoginMutationRequestSchema,
	usePostApiAuthLogin,
	type PostApiAuthLoginMutationRequest,
} from "@/gen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/lib/apiClient";
import { Form } from "@/components/organisms/Form";
import { InputGroup } from "@/components/molecules/InputGroup";
import { RememberRow } from "@/components/molecules/RememberRow";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const [rememberMe, setRememberMe] = useState(false);

	const {
		mutate: loginMutation,
		isPending,
		isError,
	} = usePostApiAuthLogin({
		client: { client: apiClient },
		mutation: {
			onSuccess: () => {
				navigate({ to: "/dashboard" });
			},
		},
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<PostApiAuthLoginMutationRequest>({
		resolver: zodResolver(postApiAuthLoginMutationRequestSchema),
	});

	const onSubmit = handleSubmit(async (data) => {
		await loginMutation({ data });
	});

	return (
		<div className="flex flex-1 items-center justify-center bg-background">
			<Form>
				<Form.Header
					title="Welcome back"
					subtitle="Enter your credentials to access your account"
				/>

				<Form.Body onSubmit={onSubmit}>
					<Form.Fields>
						<InputGroup
							label="Email"
							icon={Mail}
							type="email"
							placeholder="you@example.com"
							autoComplete="email"
							{...register("email")}
						/>
						{errors.email && (
							<p className="text-sm text-destructive">{errors.email.message}</p>
						)}
						<InputGroup
							label="Password"
							icon={Lock}
							type="password"
							placeholder="••••••••"
							autoComplete="current-password"
							{...register("password")}
						/>
						{errors.password && (
							<p className="text-sm text-destructive">{errors.password.message}</p>
						)}
						<RememberRow
							checked={rememberMe}
							onCheckedChange={setRememberMe}
							onForgotPassword={() => {}}
						/>
					</Form.Fields>

					<Form.Actions>
						<Form.Submit disabled={isPending}>
							{isPending ? "Signing in..." : "Sign in"}
						</Form.Submit>
						<Form.Divider />
						<Form.SocialButton>
							Continue with Google
						</Form.SocialButton>
					</Form.Actions>

					{isError && (
						<p className="text-sm text-destructive text-center">
							Failed to login
						</p>
					)}
				</Form.Body>

				<Form.Footer
					text="Don't have an account?"
					linkText="Sign up"
					onLinkClick={() => navigate({ to: "/login" })}
				/>
			</Form>
		</div>
	);
}
