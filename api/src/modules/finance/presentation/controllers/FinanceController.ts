import type { FastifyReply, FastifyRequest } from "fastify";
import type { ICreateConnectTokenUseCase } from "../../application/usecases/ICreateConnectTokenUseCase";
import type { ISyncConnectionUseCase } from "../../application/usecases/ISyncConnectionUseCase";
import type { IListConnectionsUseCase } from "../../application/usecases/IListConnectionsUseCase";
import type { IListAccountsUseCase } from "../../application/usecases/IListAccountsUseCase";
import type { IListTransactionsUseCase } from "../../application/usecases/IListTransactionsUseCase";
import type { IHandleWebhookUseCase } from "../../application/usecases/IHandleWebhookUseCase";
import type {
	TransactionListQuery,
	WebhookInput,
} from "@/routes/finance/financeSchema";

interface JwtUser {
	id: string;
	email: string;
	name: string;
}

export class FinanceController {
	constructor(
		private readonly createConnectTokenUseCase?: ICreateConnectTokenUseCase,
		private readonly syncConnectionUseCase?: ISyncConnectionUseCase,
		private readonly listConnectionsUseCase?: IListConnectionsUseCase,
		private readonly listAccountsUseCase?: IListAccountsUseCase,
		private readonly listTransactionsUseCase?: IListTransactionsUseCase,
		private readonly handleWebhookUseCase?: IHandleWebhookUseCase,
	) {}

	public async createConnectToken(
		request: FastifyRequest,
		reply: FastifyReply,
	) {
		const body = request.body as { itemId?: string } | undefined;
		const token = await this.createConnectTokenUseCase!.execute(
			body?.itemId,
		);
		return reply.status(201).send(token);
	}

	public async syncConnection(request: FastifyRequest, reply: FastifyReply) {
		const user = request.user as JwtUser;
		const { providerItemId } = request.params as {
			providerItemId: string;
		};
		const connection = await this.syncConnectionUseCase!.execute(
			user.id,
			providerItemId,
		);
		return reply.status(200).send(connection);
	}

	public async listConnections(request: FastifyRequest, reply: FastifyReply) {
		const user = request.user as JwtUser;
		const connections = await this.listConnectionsUseCase!.execute(user.id);
		return reply.status(200).send(connections);
	}

	public async listAccounts(request: FastifyRequest, reply: FastifyReply) {
		const user = request.user as JwtUser;
		const accounts = await this.listAccountsUseCase!.execute(user.id);
		return reply.status(200).send(accounts);
	}

	public async listTransactions(
		request: FastifyRequest,
		reply: FastifyReply,
	) {
		const user = request.user as JwtUser;
		const query = request.query as TransactionListQuery;
		const result = await this.listTransactionsUseCase!.execute(
			user.id,
			query,
		);
		return reply.status(200).send(result);
	}

	public async handleWebhook(request: FastifyRequest, reply: FastifyReply) {
		const body = request.body as WebhookInput;
		await this.handleWebhookUseCase!.execute(body);
		return reply.status(204).send();
	}
}
