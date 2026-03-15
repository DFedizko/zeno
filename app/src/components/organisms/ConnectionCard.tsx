import { Building2 } from "lucide-react";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import { AccountItem } from "@/components/molecules/AccountItem";
import { PluggyConnectWidget } from "@/components/organisms/PluggyConnectWidget";

interface Account {
	id: string;
	name: string;
	subtype: string;
	number: string | null;
	balance: number;
	creditLimit: number | null;
}

interface ConnectionCardProps {
	connectorName: string;
	connectorImageUrl: string | null;
	connectorColor: string | null;
	status: string;
	lastSyncAt: string | null;
	providerItemId: string;
	accounts: Account[];
}

export const ConnectionCard = ({
	connectorName,
	connectorImageUrl,
	connectorColor,
	status,
	lastSyncAt,
	providerItemId,
	accounts,
}: ConnectionCardProps) => (
	<div className="flex flex-col gap-4 p-5 bg-card rounded-xl border border-border">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				{connectorImageUrl ? (
					<img
						src={connectorImageUrl}
						alt={connectorName}
						className="size-10 rounded-lg object-contain"
					/>
				) : (
					<div
						className="flex items-center justify-center size-10 rounded-lg"
						style={{ backgroundColor: connectorColor ?? "#3B82F6" }}
					>
						<Building2 className="size-5 text-white" />
					</div>
				)}
				<div className="flex flex-col">
					<span className="text-sm font-semibold text-primary">
						{connectorName}
					</span>
					{lastSyncAt && (
						<span className="text-xs text-tertiary">
							Última sync:{" "}
							{new Date(lastSyncAt).toLocaleDateString("pt-BR")}
						</span>
					)}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<StatusBadge status={status} />
				{(status === "ERROR" || status === "WAITING_USER_INPUT") && (
					<PluggyConnectWidget updateItemId={providerItemId} />
				)}
			</div>
		</div>

		{accounts.length > 0 && (
			<div className="flex flex-col gap-2 border-t border-border pt-4">
				{accounts.map((account) => (
					<AccountItem
						key={account.id}
						name={account.name}
						subtype={account.subtype}
						number={account.number}
						balance={account.balance}
						creditLimit={account.creditLimit}
					/>
				))}
			</div>
		)}
	</div>
);
