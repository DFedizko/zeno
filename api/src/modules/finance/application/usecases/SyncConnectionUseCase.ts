import type { ISyncConnectionUseCase } from "./ISyncConnectionUseCase";
import type { IFinanceGateway } from "@/modules/finance/application/gateways/IFinanceGateway";
import type { IConnectionRepository } from "@/modules/finance/infrastructure/repositories/IConnectionRepository";
import type { IFinancialAccountRepository } from "@/modules/finance/infrastructure/repositories/IFinancialAccountRepository";
import type { ITransactionRepository } from "@/modules/finance/infrastructure/repositories/ITransactionRepository";
import type { ICategoryRepository } from "@/modules/finance/infrastructure/repositories/ICategoryRepository";
import type { ICreditCardBillRepository } from "@/modules/finance/infrastructure/repositories/ICreditCardBillRepository";
import type { ConnectionOutput } from "@/routes/finance/financeSchema";

export class SyncConnectionUseCase implements ISyncConnectionUseCase {
	constructor(
		private readonly gateway: IFinanceGateway,
		private readonly connectionRepository: IConnectionRepository,
		private readonly accountRepository: IFinancialAccountRepository,
		private readonly transactionRepository: ITransactionRepository,
		private readonly categoryRepository: ICategoryRepository,
		private readonly billRepository: ICreditCardBillRepository,
	) {}

	async execute(
		userId: string,
		providerItemId: string,
	): Promise<ConnectionOutput> {
		const item = await this.gateway.getItem(providerItemId);

		let connection: ConnectionOutput;
		try {
			connection =
				await this.connectionRepository.findByProviderItemId(
					providerItemId,
				);
			await this.connectionRepository.updateStatus(
				connection.id,
				item.status,
			);
		} catch {
			connection = await this.connectionRepository.create(userId, {
				provider: "pluggy",
				providerItemId: item.providerItemId,
				connectorName: item.connectorName,
				connectorImageUrl: item.connectorImageUrl,
				connectorColor: item.connectorColor,
			});
		}

		const gatewayAccounts = await this.gateway.getAccounts(providerItemId);

		for (const gatewayAccount of gatewayAccounts) {
			const account =
				await this.accountRepository.upsertByProviderAccountId(
					connection.id,
					{
						providerAccountId: gatewayAccount.providerAccountId,
						type: gatewayAccount.type,
						subtype: gatewayAccount.subtype,
						name: gatewayAccount.name,
						number: gatewayAccount.number,
						balance: gatewayAccount.balance,
						currencyCode: gatewayAccount.currencyCode,
						creditLimit: gatewayAccount.creditLimit,
						availableCreditLimit:
							gatewayAccount.availableCreditLimit,
						cardBrand: gatewayAccount.cardBrand,
						cardLevel: gatewayAccount.cardLevel,
					},
				);

			const now = new Date();
			const threeMonthsAgo = new Date(
				now.getFullYear(),
				now.getMonth() - 3,
				now.getDate(),
			);
			const gatewayTransactions = await this.gateway.getTransactions(
				gatewayAccount.providerAccountId,
				threeMonthsAgo,
				now,
			);

			for (const tx of gatewayTransactions) {
				if (tx.categoryName) {
					const category =
						await this.categoryRepository.findOrCreateByName(
							tx.categoryName,
						);
					await this.transactionRepository.upsertByProviderTransactionId(
						account.id,
						{ ...tx, categoryName: category.name },
					);
				} else {
					await this.transactionRepository.upsertByProviderTransactionId(
						account.id,
						tx,
					);
				}
			}

			if (gatewayAccount.type === "CREDIT") {
				const gatewayBills = await this.gateway.getBills(
					gatewayAccount.providerAccountId,
				);
				for (const bill of gatewayBills) {
					await this.billRepository.upsertByProviderBillId(
						account.id,
						{
							providerBillId: bill.providerBillId,
							dueDate: bill.dueDate,
							closeDate: bill.closeDate,
							totalAmount: bill.totalAmount,
							minimumPayment: bill.minimumPayment,
							status: bill.status,
						},
					);
				}
			}
		}

		const updatedConnection = await this.connectionRepository.updateStatus(
			connection.id,
			"UPDATED",
			new Date(),
		);

		return updatedConnection;
	}
}
