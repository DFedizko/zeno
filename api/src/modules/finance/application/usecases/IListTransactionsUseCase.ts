import type {
	PaginatedTransactionOutput,
	TransactionListQuery,
} from "@/routes/finance/financeSchema";

export interface IListTransactionsUseCase {
	execute(
		userId: string,
		query: TransactionListQuery,
	): Promise<PaginatedTransactionOutput>;
}
