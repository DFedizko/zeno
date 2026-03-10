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
		<>
			<HeadContent />
			<Outlet />
		</>
	);
}
