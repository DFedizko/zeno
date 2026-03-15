import type { FastifyReply, FastifyRequest } from "fastify";
import { FinanceController } from "@/modules/finance/presentation/controllers/FinanceController";
import { ListAccountsUseCase } from "@/modules/finance/application/usecases/ListAccountsUseCase";
import { FinancialAccountRepository } from "@/modules/finance/infrastructure/repositories/FinancialAccountRepository";

export const getAccounts = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	return new FinanceController(
		undefined,
		undefined,
		undefined,
		new ListAccountsUseCase(new FinancialAccountRepository()),
	).listAccounts(request, reply);
};
