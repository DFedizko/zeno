import type { ICreateConnectTokenUseCase } from "./ICreateConnectTokenUseCase";
import type { IFinanceGateway } from "@/modules/finance/application/gateways/IFinanceGateway";
import type { ConnectTokenOutput } from "@/routes/finance/financeSchema";

export class CreateConnectTokenUseCase implements ICreateConnectTokenUseCase {
	constructor(private readonly gateway: IFinanceGateway) {}

	async execute(itemId?: string): Promise<ConnectTokenOutput> {
		return this.gateway.createConnectToken(itemId);
	}
}
