import { getApiAuthMe } from "@/gen/clients/getApiAuthMe";
import { apiClient } from "@/lib/apiClient";
import {
	createFileRoute,
	redirect,
	isRedirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
	beforeLoad: async ({ location }) => {
		try {
			const user = await getApiAuthMe({ client: apiClient });

			// use Zustand to save user data to access in all pages.

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
});
