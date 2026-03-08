import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { AuthState } from "../auth";

export const Route = createRootRouteWithContext<{
	auth: AuthState;
}>()({
	component: RootComponent,
});

function RootComponent() {
	return (
		<React.Fragment>
			<div>Hello "__root"!</div>
			<Outlet />
		</React.Fragment>
	);
}
