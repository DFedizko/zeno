import { getApiAuthMe } from "@/gen/clients/getApiAuthMe";
import { apiClient } from "@/lib/apiClient";
import {
	createFileRoute,
	redirect,
	isRedirect,
	Outlet,
} from "@tanstack/react-router";
import { Sidebar } from "@/components/organisms/Sidebar";
import { Header } from "@/components/organisms/Header";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location }) => {
		try {
			const user = await getApiAuthMe({ client: apiClient });

			if (!user) {
				throw redirect({
					to: "/login",
					search: { redirect: location.href },
				});
			}
			return { user };
		} catch (error) {
			if (isRedirect(error)) throw error;
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const { user } = Route.useRouteContext();

	return (
		<div className="flex flex-1 min-h-0 bg-background">
			<Sidebar />
			<div className="flex flex-col flex-1 min-h-0 gap-6 p-6">
				<Header
					userName={user?.name ?? "Usuário"}
					userEmail={user?.email ?? ""}
				/>
				<Outlet />
			</div>
		</div>
	);
}
