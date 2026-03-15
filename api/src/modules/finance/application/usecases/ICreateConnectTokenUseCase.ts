import type { ConnectTokenOutput } from "@/routes/finance/financeSchema";

export interface ICreateConnectTokenUseCase {
	execute(itemId?: string): Promise<ConnectTokenOutput>;
}
