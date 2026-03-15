import type { WebhookInput } from "@/routes/finance/financeSchema";

export interface IHandleWebhookUseCase {
	execute(payload: WebhookInput): Promise<void>;
}
