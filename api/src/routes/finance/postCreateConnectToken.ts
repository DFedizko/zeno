import type { FastifyReply, FastifyRequest } from "fastify";
import { FinanceController } from "@/modules/finance/presentation/controllers/FinanceController";
import { CreateConnectTokenUseCase } from "@/modules/finance/application/usecases/CreateConnectTokenUseCase";
import { PluggyGateway } from "@/modules/finance/infrastructure/gateways/PluggyGateway";
import { PluggyHttpClient } from "@/modules/finance/infrastructure/http/PluggyHttpClient";

export const postCreateConnectToken = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	return new FinanceController(
		new CreateConnectTokenUseCase(
			new PluggyGateway(new PluggyHttpClient()),
		),
	).createConnectToken(request, reply);
};
