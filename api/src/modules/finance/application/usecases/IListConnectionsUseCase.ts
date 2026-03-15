import type { ConnectionOutput } from "@/routes/finance/financeSchema";

export interface IListConnectionsUseCase {
	execute(userId: string): Promise<ConnectionOutput[]>;
}
