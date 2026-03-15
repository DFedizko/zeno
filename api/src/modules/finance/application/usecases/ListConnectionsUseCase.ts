import type { IListConnectionsUseCase } from "./IListConnectionsUseCase";
import type { IConnectionRepository } from "@/modules/finance/infrastructure/repositories/IConnectionRepository";
import type { ConnectionOutput } from "@/routes/finance/financeSchema";

export class ListConnectionsUseCase implements IListConnectionsUseCase {
	constructor(private readonly connectionRepository: IConnectionRepository) {}

	async execute(userId: string): Promise<ConnectionOutput[]> {
		return this.connectionRepository.findByUserId(userId);
	}
}
