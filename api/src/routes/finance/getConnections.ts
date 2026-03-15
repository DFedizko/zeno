import type { FastifyReply, FastifyRequest } from "fastify";
import { FinanceController } from "@/modules/finance/presentation/controllers/FinanceController";
import { ListConnectionsUseCase } from "@/modules/finance/application/usecases/ListConnectionsUseCase";
import { ConnectionRepository } from "@/modules/finance/infrastructure/repositories/ConnectionRepository";

export const getConnections = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	return new FinanceController(
		undefined,
		undefined,
		new ListConnectionsUseCase(new ConnectionRepository()),
	).listConnections(request, reply);
};
