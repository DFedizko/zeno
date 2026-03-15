import { Loader2 } from "lucide-react";
import { PageTitle } from "@/components/atoms/PageTitle";
import { ConnectionCard } from "@/components/organisms/ConnectionCard";
import { ConnectionEmptyState } from "@/components/organisms/ConnectionEmptyState";
import { PluggyConnectWidget } from "@/components/organisms/PluggyConnectWidget";

interface Account {
	id: string;
	connectionId: string;
	name: string;
	subtype: string;
	number: string | null;
	balance: number;
	creditLimit: number | null;
}

interface Connection {
	id: string;
	connectorName: string;
	connectorImageUrl: string | null;
	connectorColor: string | null;
	status: string;
	lastSyncAt: string | null;
	providerItemId: string;
}

export interface ConnectionsTemplateProps {
	connections: Connection[];
	accounts: Account[];
	isLoading: boolean;
}

export const ConnectionsTemplate = ({
	connections,
	accounts,
	isLoading,
}: ConnectionsTemplateProps) => (
	<div className="flex flex-col gap-6">
		<PageTitle title="Conexões">
			<PluggyConnectWidget />
		</PageTitle>

		{isLoading ? (
			<div className="flex items-center justify-center py-20">
				<Loader2 className="size-6 animate-spin text-tertiary" />
			</div>
		) : connections.length === 0 ? (
			<ConnectionEmptyState />
		) : (
			<div className="flex flex-col gap-4">
				{connections.map((connection) => (
					<ConnectionCard
						key={connection.id}
						connectorName={connection.connectorName}
						connectorImageUrl={connection.connectorImageUrl}
						connectorColor={connection.connectorColor}
						status={connection.status}
						lastSyncAt={connection.lastSyncAt}
						providerItemId={connection.providerItemId}
						accounts={accounts.filter(
							(a) => a.connectionId === connection.id,
						)}
					/>
				))}
			</div>
		)}
	</div>
);
