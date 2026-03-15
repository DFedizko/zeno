import type {
	FinancialAccountOutput,
	FinancialAccountInput,
} from "@/routes/finance/financeSchema";

export interface IFinancialAccountRepository {
	findByConnectionId(connectionId: string): Promise<FinancialAccountOutput[]>;
	findByUserId(userId: string): Promise<FinancialAccountOutput[]>;
	findById(id: string): Promise<FinancialAccountOutput>;
	upsertByProviderAccountId(
		connectionId: string,
		input: FinancialAccountInput,
	): Promise<FinancialAccountOutput>;
	deleteByConnectionId(connectionId: string): Promise<void>;
}
