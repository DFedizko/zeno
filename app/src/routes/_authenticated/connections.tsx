import { createFileRoute } from "@tanstack/react-router";
import { ConnectionsTemplate } from "@/components/templates/ConnectionsTemplate";
import { useGetApiFinanceConnections } from "@/gen/hooks/useGetApiFinanceConnections";
import { useGetApiFinanceAccounts } from "@/gen/hooks/useGetApiFinanceAccounts";
import { apiClient } from "@/lib/apiClient";

export const Route = createFileRoute("/_authenticated/connections")({
	component: ConnectionsPage,
});

interface Connection {
	id: string;
	connectorName: string;
	connectorImageUrl: string | null;
	connectorColor: string | null;
	status: string;
	lastSyncAt: string | null;
	providerItemId: string;
}

interface Account {
	id: string;
	connectionId: string;
	name: string;
	subtype: string;
	number: string | null;
	balance: number;
	creditLimit: number | null;
}

function ConnectionsPage() {
	const { data: connections, isLoading: isLoadingConnections } =
		useGetApiFinanceConnections({ client: { client: apiClient } });

	const { data: accounts, isLoading: isLoadingAccounts } =
		useGetApiFinanceAccounts({ client: { client: apiClient } });

	return (
		<ConnectionsTemplate
			connections={(connections as unknown as Connection[]) ?? []}
			accounts={(accounts as unknown as Account[]) ?? []}
			isLoading={isLoadingConnections || isLoadingAccounts}
		/>
	);
}
