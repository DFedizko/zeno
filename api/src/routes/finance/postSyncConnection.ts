import type { FastifyReply, FastifyRequest } from "fastify";
import { FinanceController } from "@/modules/finance/presentation/controllers/FinanceController";
import { SyncConnectionUseCase } from "@/modules/finance/application/usecases/SyncConnectionUseCase";
import { PluggyGateway } from "@/modules/finance/infrastructure/gateways/PluggyGateway";
import { PluggyHttpClient } from "@/modules/finance/infrastructure/http/PluggyHttpClient";
import { ConnectionRepository } from "@/modules/finance/infrastructure/repositories/ConnectionRepository";
import { FinancialAccountRepository } from "@/modules/finance/infrastructure/repositories/FinancialAccountRepository";
import { TransactionRepository } from "@/modules/finance/infrastructure/repositories/TransactionRepository";
import { CategoryRepository } from "@/modules/finance/infrastructure/repositories/CategoryRepository";
import { CreditCardBillRepository } from "@/modules/finance/infrastructure/repositories/CreditCardBillRepository";

export const postSyncConnection = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	return new FinanceController(
		undefined,
		new SyncConnectionUseCase(
			new PluggyGateway(new PluggyHttpClient()),
			new ConnectionRepository(),
			new FinancialAccountRepository(),
			new TransactionRepository(),
			new CategoryRepository(),
			new CreditCardBillRepository(),
		),
	).syncConnection(request, reply);
};
