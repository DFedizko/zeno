import type { FinancialAccountOutput } from "@/routes/finance/financeSchema";

export interface IListAccountsUseCase {
	execute(userId: string): Promise<FinancialAccountOutput[]>;
}
