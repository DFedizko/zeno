import type { ConnectionOutput } from "@/routes/finance/financeSchema";

export interface ISyncConnectionUseCase {
	execute(userId: string, providerItemId: string): Promise<ConnectionOutput>;
}
