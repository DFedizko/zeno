import type { IListTransactionsUseCase } from "./IListTransactionsUseCase";
import type { ITransactionRepository } from "@/modules/finance/infrastructure/repositories/ITransactionRepository";
import type {
	PaginatedTransactionOutput,
	TransactionListQuery,
} from "@/routes/finance/financeSchema";

export class ListTransactionsUseCase implements IListTransactionsUseCase {
	constructor(
		private readonly transactionRepository: ITransactionRepository,
	) {}

	async execute(
		userId: string,
		query: TransactionListQuery,
	): Promise<PaginatedTransactionOutput> {
		return this.transactionRepository.findByUserId(userId, {
			from: query.from,
			to: query.to,
			categoryId: query.categoryId,
			type: query.type,
			page: query.page,
			pageSize: query.pageSize,
		});
	}
}
