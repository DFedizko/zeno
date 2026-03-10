import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useGetApiAuthMe } from "@/gen/hooks/useGetApiAuthMe";

export const Route = createFileRoute("/_authenticated/dashboard")({
	component: DashboardPage,
});

function DashboardPage() {
	return (
		<div className="p-8">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Dashboard</h1>
				<button
					type="button"
					// onClick={handleLogout}
					className="rounded bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300"
				>
					Sair
				</button>
			</div>
			<p className="mt-2 text-gray-600">
				{/* Bem-vindo, {user?.name ?? user?.email} */}
			</p>
		</div>
	);
}
