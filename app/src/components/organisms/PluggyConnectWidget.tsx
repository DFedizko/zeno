import { useState } from "react";
import { PluggyConnect } from "react-pluggy-connect";
import { usePostApiFinanceConnectToken } from "@/gen/hooks/usePostApiFinanceConnectToken";
import { usePostApiFinanceSyncProvideritemid } from "@/gen/hooks/usePostApiFinanceSyncProvideritemid";
import { useQueryClient } from "@tanstack/react-query";
import { getApiFinanceConnectionsQueryKey } from "@/gen/hooks/useGetApiFinanceConnections";
import { getApiFinanceAccountsQueryKey } from "@/gen/hooks/useGetApiFinanceAccounts";
import { apiClient } from "@/lib/apiClient";
import { Landmark, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PluggyConnectWidgetProps {
	updateItemId?: string;
}

export const PluggyConnectWidget = ({
	updateItemId,
}: PluggyConnectWidgetProps) => {
	const [connectToken, setConnectToken] = useState<string | null>(null);
	const [isSyncing, setIsSyncing] = useState(false);
	const queryClient = useQueryClient();

	const { mutate: createToken, isPending: isCreatingToken } =
		usePostApiFinanceConnectToken({
			client: { client: apiClient },
			mutation: {
				onSuccess: (data) => {
					setConnectToken(data.connectToken);
				},
			},
		});

	const { mutate: syncConnection } = usePostApiFinanceSyncProvideritemid({
		client: { client: apiClient },
		mutation: {
			onSuccess: () => {
				queryClient.invalidateQueries({
					queryKey: getApiFinanceConnectionsQueryKey(),
				});
				queryClient.invalidateQueries({
					queryKey: getApiFinanceAccountsQueryKey(),
				});
				setIsSyncing(false);
			},
			onError: () => {
				setIsSyncing(false);
			},
		},
	});

	const handleOpen = () => {
		createToken({ data: updateItemId ? { itemId: updateItemId } : {} });
	};

	const handleSuccess = (data: { item: { id: string } }) => {
		setConnectToken(null);
		setIsSyncing(true);
		syncConnection({ providerItemId: data.item.id });
	};

	const handleClose = () => {
		setConnectToken(null);
	};

	return (
		<>
			<Button
				onClick={handleOpen}
				disabled={isCreatingToken || isSyncing}
				className="gap-2"
			>
				{isCreatingToken || isSyncing ? (
					<Loader2 className="size-4 animate-spin text-white" />
				) : (
					<Landmark color="var(--color-white)" className="size-4" />
				)}
				{isSyncing
					? "Sincronizando..."
					: isCreatingToken
						? "Conectando..."
						: "Conectar banco"}
			</Button>

			{connectToken && (
				<PluggyConnect
					connectToken={connectToken}
					includeSandbox
					onSuccess={handleSuccess}
					onClose={handleClose}
					onError={() => setConnectToken(null)}
				/>
			)}
		</>
	);
};
