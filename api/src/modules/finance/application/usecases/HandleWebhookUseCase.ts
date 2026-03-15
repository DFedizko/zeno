import type { IHandleWebhookUseCase } from "./IHandleWebhookUseCase";
import type { ISyncConnectionUseCase } from "./ISyncConnectionUseCase";
import type { IConnectionRepository } from "@/modules/finance/infrastructure/repositories/IConnectionRepository";
import type { WebhookInput } from "@/routes/finance/financeSchema";

export class HandleWebhookUseCase implements IHandleWebhookUseCase {
	constructor(
		private readonly syncConnectionUseCase: ISyncConnectionUseCase,
		private readonly connectionRepository: IConnectionRepository,
	) {}

	async execute(payload: WebhookInput): Promise<void> {
		if (!payload.itemId) return;

		const connection = await this.connectionRepository.findByProviderItemId(
			payload.itemId,
		);

		await this.syncConnectionUseCase.execute(
			connection.userId,
			payload.itemId,
		);
	}
}
