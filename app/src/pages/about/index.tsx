import { useGetApiAuthMe } from "@/gen";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { isLoading, error, data } = useGetApiAuthMe();

	return <div>{data?.name}</div>;
}
