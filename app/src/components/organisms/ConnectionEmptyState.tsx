import { Building2 } from "lucide-react";
import { PluggyConnectWidget } from "@/components/organisms/PluggyConnectWidget";

export const ConnectionEmptyState = () => (
	<div className="flex flex-col items-center justify-center gap-4 py-20 bg-card rounded-xl border border-border">
		<div className="flex items-center justify-center size-16 rounded-2xl bg-accent/10">
			<Building2 className="size-8 text-accent" />
		</div>
		<div className="flex flex-col items-center gap-1">
			<span className="text-base font-semibold text-primary">
				Nenhuma conexão ainda
			</span>
			<span className="text-sm text-tertiary text-center max-w-sm">
				Conecte sua conta bancária para visualizar suas transações,
				saldos e cartões de crédito automaticamente.
			</span>
		</div>
		<PluggyConnectWidget />
	</div>
);
