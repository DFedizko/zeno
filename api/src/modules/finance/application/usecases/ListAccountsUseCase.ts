import type { IListAccountsUseCase } from "./IListAccountsUseCase";
import type { IFinancialAccountRepository } from "@/modules/finance/infrastructure/repositories/IFinancialAccountRepository";
import type { FinancialAccountOutput } from "@/routes/finance/financeSchema";

export class ListAccountsUseCase implements IListAccountsUseCase {
	constructor(
		private readonly accountRepository: IFinancialAccountRepository,
	) {}

	async execute(userId: string): Promise<FinancialAccountOutput[]> {
		return this.accountRepository.findByUserId(userId);
	}
}
