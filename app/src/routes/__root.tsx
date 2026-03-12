import {
	HeadContent,
	Outlet,
	createRootRouteWithContext,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<main className="flex flex-col h-screen">
			<HeadContent />
			<Outlet />
		</main>
	);
}
