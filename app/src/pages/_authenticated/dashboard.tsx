import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	const { user, logout } = useAuth();

	return (
		<div className="p-8">
			<h1 className="text-xl font-semibold">Dashboard (protegido)</h1>
			<p className="mt-2 text-gray-600">
				Olá, {user?.name ?? user?.email ?? "usuário"}.
			</p>
			<div className="mt-4 flex gap-4">
				<Link
					to="/login"
					search={{ redirect: "/dashboard" }}
					className="text-blue-600 underline"
				>
					Ir para login
				</Link>
				<button
					type="button"
					onClick={() => logout()}
					className="text-red-600 underline"
				>
					Sair
				</button>
			</div>
		</div>
	);
}
