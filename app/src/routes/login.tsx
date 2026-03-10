import { createFileRoute, redirect, Router, useNavigate } from "@tanstack/react-router";
import {
	postApiAuthLoginMutationRequestSchema,
	usePostApiAuthLogin,
	type PostApiAuthLoginMutationRequest,
} from "@/gen";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "@/lib/apiClient";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();

	const {
		mutate: loginMutation,
		isPending,
		isError
	} = usePostApiAuthLogin({
		client: { client: apiClient },
		mutation: {
			onSuccess: () => {
				console.log("success!");
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

	const onSubmit = handleSubmit(
		async (data: PostApiAuthLoginMutationRequest) => {
			await loginMutation({ data });
		},
	);

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 p-8">
			<h1 className="text-xl font-semibold">Entrar</h1>
			<form onSubmit={onSubmit} className="flex w-full max-w-xs flex-col gap-3">
				<fieldset className="flex flex-col">
					<label htmlFor="email-input">Email</label>
					<input
						type="email"
						id="email-input"
						placeholder="E-mail"
						{...register("email")}
						required
						className="rounded border border-gray-300 px-3 py-2"
					/>
					{errors.email && (
						<p className="text-sm text-red-600" role="alert">
							{errors.email.message}
						</p>
					)}
				</fieldset>
				<fieldset className="flex flex-col">
					<label htmlFor="password-input">Senha</label>
					<input
						type="password"
						id="password-input"
						placeholder="********"
						{...register("password")}
						required
						minLength={8}
						className="rounded border border-gray-300 px-3 py-2"
					/>
					{errors.password && (
						<p className="text-sm text-red-600" role="alert">
							{errors.password.message}
						</p>
					)}
				</fieldset>
				<button
					type="submit"
					disabled={isPending}
					className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
				>
					{isPending ? "Entrando…" : "Entrar"}
				</button>
				{isError && <p className="text-red-600">Failed to login</p>}
			</form>
		</div>
	);
}
