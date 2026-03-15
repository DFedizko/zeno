import { getApiAuthMe } from "@/gen/clients/getApiAuthMe";
import { usePostApiAuthLogout } from "@/gen/hooks/usePostApiAuthLogout";
import { apiClient } from "@/lib/apiClient";
import { useUserStore } from "@/stores/useUserStore";
import {
	createFileRoute,
	redirect,
	isRedirect,
	Outlet,
	useNavigate,
} from "@tanstack/react-router";
import { useEffect } from "react";
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

	const navigate = useNavigate();
	const setUser = useUserStore((s) => s.setUser);
	const clearUser = useUserStore((s) => s.clearUser);

	useEffect(() => {
		if (user) setUser(user);
	}, [user, setUser]);

	const { mutate: logout } = usePostApiAuthLogout({
		client: { client: apiClient },
		mutation: {
			onSuccess: () => {
				clearUser();
				navigate({ to: "/login" });
			},
		},
	});

	return (
		<div className="flex flex-1 min-h-0 bg-background">
			<Sidebar />
			<div className="flex flex-col flex-1 min-h-0 gap-6 p-6 ml-60 overflow-y-auto">
				<Header onLogout={() => logout()} />
				<Outlet />
			</div>
		</div>
	);
}
