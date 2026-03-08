import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/login")({
	validateSearch: (search: Record<string, unknown>) => ({
		redirect: (search.redirect as string) ?? "/",
	}),
	component: LoginPage,
});

function LoginPage() {
	const { login } = useAuth();
	const router = useRouter();
	const { redirect } = Route.useSearch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

	useEffect(() => {
		if (pendingRedirect !== null) {
			router.history.push(pendingRedirect);
			setPendingRedirect(null);
		}
	}, [pendingRedirect, router.history]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSubmitting(true);
		try {
			await login(email, password);
			setPendingRedirect(redirect);
		} catch {
			setError("E-mail ou senha inválidos.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8">
			<h1 className="text-xl font-semibold">Entrar</h1>
			<form
				onSubmit={handleSubmit}
				className="flex w-full max-w-xs flex-col gap-3"
			>
				<input
					type="email"
					placeholder="E-mail"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
					className="rounded border border-gray-300 px-3 py-2"
				/>
				<input
					type="password"
					placeholder="Senha"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					minLength={8}
					className="rounded border border-gray-300 px-3 py-2"
				/>
				{error && (
					<p className="text-sm text-red-600" role="alert">
						{error}
					</p>
				)}
				<button
					type="submit"
					disabled={isSubmitting}
					className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
				>
					{isSubmitting ? "Entrando…" : "Entrar"}
				</button>
			</form>
		</div>
	);
}
