import type {
	TransactionOutput,
	TransactionListOutput,
	TransactionInput,
} from "@/routes/finance/financeSchema";

export interface ITransactionRepository {
	findByAccountId(
		accountId: string,
		filters?: {
			from?: Date;
			to?: Date;
			categoryId?: string;
			type?: string;
		},
	): Promise<TransactionListOutput[]>;
	findByUserId(
		userId: string,
		filters?: {
			from?: Date;
			to?: Date;
			categoryId?: string;
			type?: string;
			page?: number;
			pageSize?: number;
		},
	): Promise<{
		results: TransactionListOutput[];
		total: number;
		page: number;
		totalPages: number;
	}>;
	findById(id: string): Promise<TransactionOutput>;
	upsertByProviderTransactionId(
		accountId: string,
		input: TransactionInput,
	): Promise<TransactionOutput>;
	deleteByProviderTransactionId(providerTransactionId: string): Promise<void>;
	deleteByAccountId(accountId: string): Promise<void>;
}
