import type {
	ConnectionOutput,
	ConnectionInput,
} from "@/routes/finance/financeSchema";

export interface IConnectionRepository {
	findByUserId(userId: string): Promise<ConnectionOutput[]>;
	findById(id: string): Promise<ConnectionOutput>;
	findByProviderItemId(providerItemId: string): Promise<ConnectionOutput>;
	create(userId: string, input: ConnectionInput): Promise<ConnectionOutput>;
	updateStatus(
		id: string,
		status: string,
		lastSyncAt?: Date,
	): Promise<ConnectionOutput>;
	delete(id: string): Promise<void>;
}
