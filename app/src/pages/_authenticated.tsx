import {
	createFileRoute,
	Outlet,
	redirect,
	useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/auth";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isLoading && !context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}
	},
	component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
	const router = useRouter();
	const auth = useAuth();

	useEffect(() => {
		if (!auth.isLoading && !auth.isAuthenticated) {
			router.navigate({
				to: "/login",
				search: { redirect: router.state.location.href },
			});
		}
	}, [auth.isLoading, auth.isAuthenticated, router]);

	if (auth.isLoading) {
		return (
			<div className="flex min-h-[40vh] items-center justify-center p-8">
				<p className="text-gray-500">Carregando…</p>
			</div>
		);
	}

	if (!auth.isAuthenticated) {
		return null;
	}

	return <Outlet />;
}
