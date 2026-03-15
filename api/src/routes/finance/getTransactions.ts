import type { FastifyReply, FastifyRequest } from "fastify";
import { FinanceController } from "@/modules/finance/presentation/controllers/FinanceController";
import { ListTransactionsUseCase } from "@/modules/finance/application/usecases/ListTransactionsUseCase";
import { TransactionRepository } from "@/modules/finance/infrastructure/repositories/TransactionRepository";

export const getTransactions = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	return new FinanceController(
		undefined,
		undefined,
		undefined,
		undefined,
		new ListTransactionsUseCase(new TransactionRepository()),
	).listTransactions(request, reply);
};
