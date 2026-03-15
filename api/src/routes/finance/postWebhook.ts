import type { FastifyReply, FastifyRequest } from "fastify";
import { FinanceController } from "@/modules/finance/presentation/controllers/FinanceController";
import { HandleWebhookUseCase } from "@/modules/finance/application/usecases/HandleWebhookUseCase";
import { SyncConnectionUseCase } from "@/modules/finance/application/usecases/SyncConnectionUseCase";
import { PluggyGateway } from "@/modules/finance/infrastructure/gateways/PluggyGateway";
import { PluggyHttpClient } from "@/modules/finance/infrastructure/http/PluggyHttpClient";
import { ConnectionRepository } from "@/modules/finance/infrastructure/repositories/ConnectionRepository";
import { FinancialAccountRepository } from "@/modules/finance/infrastructure/repositories/FinancialAccountRepository";
import { TransactionRepository } from "@/modules/finance/infrastructure/repositories/TransactionRepository";
import { CategoryRepository } from "@/modules/finance/infrastructure/repositories/CategoryRepository";
import { CreditCardBillRepository } from "@/modules/finance/infrastructure/repositories/CreditCardBillRepository";

export const postWebhook = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const gateway = new PluggyGateway(new PluggyHttpClient());
	const connectionRepository = new ConnectionRepository();

	return new FinanceController(
		undefined,
		undefined,
		undefined,
		undefined,
		undefined,
		new HandleWebhookUseCase(
			new SyncConnectionUseCase(
				gateway,
				connectionRepository,
				new FinancialAccountRepository(),
				new TransactionRepository(),
				new CategoryRepository(),
				new CreditCardBillRepository(),
			),
			connectionRepository,
		),
	).handleWebhook(request, reply);
};
