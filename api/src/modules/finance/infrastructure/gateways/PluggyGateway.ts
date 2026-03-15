import type {
	IFinanceGateway,
	GatewayConnectToken,
	GatewayItem,
	GatewayAccount,
	GatewayTransaction,
	GatewayBill,
} from "@/modules/finance/application/gateways/IFinanceGateway";
import type { PluggyHttpClient } from "@/modules/finance/infrastructure/http/PluggyHttpClient";

interface PluggyPaginated<T> {
	results: T[];
	total: number;
	totalPages: number;
	page: number;
}

interface PluggyItemResponse {
	id: string;
	status: string;
	connector: {
		name: string;
		imageUrl: string | null;
		primaryColor: string | null;
	};
}

interface PluggyAccountResponse {
	id: string;
	type: string;
	subtype: string;
	name: string;
	number: string | null;
	balance: number;
	currencyCode: string;
	creditData?: {
		creditLimit: number | null;
		availableCreditLimit: number | null;
		brand: string | null;
		level: string | null;
	};
}

interface PluggyTransactionResponse {
	id: string;
	date: string;
	description: string;
	amount: number;
	type: string;
	status: string;
	operationType: string | null;
	currencyCode: string;
	category: string | null;
}

interface PluggyBillResponse {
	id: string | null;
	dueDate: string;
	closeDate: string;
	totalAmount: number;
	minimumPayment: number | null;
}

export class PluggyGateway implements IFinanceGateway {
	constructor(private readonly http: PluggyHttpClient) {}

	public async createConnectToken(
		itemId?: string,
	): Promise<GatewayConnectToken> {
		const body: Record<string, string> = {};
		if (itemId) body.itemId = itemId;

		const data = await this.http.post<{ accessToken: string }>(
			"/connect_token",
			body,
		);
		return { connectToken: data.accessToken };
	}

	public async getItem(providerItemId: string): Promise<GatewayItem> {
		const data = await this.http.get<PluggyItemResponse>(
			`/items/${providerItemId}`,
		);
		return {
			providerItemId: data.id,
			connectorName: data.connector?.name ?? "",
			connectorImageUrl: data.connector?.imageUrl ?? null,
			connectorColor: data.connector?.primaryColor ?? null,
			status: data.status,
		};
	}

	public async getAccounts(
		providerItemId: string,
	): Promise<GatewayAccount[]> {
		const data = await this.http.get<
			PluggyPaginated<PluggyAccountResponse>
		>("/accounts", { itemId: providerItemId });
		return data.results.map(PluggyGateway.mapAccount);
	}

	public async getTransactions(
		providerAccountId: string,
		from: Date,
		to: Date,
	): Promise<GatewayTransaction[]> {
		const data = await this.http.get<
			PluggyPaginated<PluggyTransactionResponse>
		>("/transactions", {
			accountId: providerAccountId,
			from: from.toISOString().split("T")[0],
			to: to.toISOString().split("T")[0],
			pageSize: 500,
		});
		return data.results.map(PluggyGateway.mapTransaction);
	}

	public async getBills(providerAccountId: string): Promise<GatewayBill[]> {
		const data = await this.http.get<PluggyPaginated<PluggyBillResponse>>(
			"/bills",
			{ accountId: providerAccountId },
		);
		return data.results.map(PluggyGateway.mapBill);
	}

	private static mapAccount(raw: PluggyAccountResponse): GatewayAccount {
		return {
			providerAccountId: raw.id,
			type: raw.type === "CREDIT" ? "CREDIT" : "BANK",
			subtype:
				raw.subtype === "CREDIT_CARD"
					? "CREDIT_CARD"
					: raw.subtype === "SAVINGS_ACCOUNT"
						? "SAVINGS"
						: "CHECKING",
			name: raw.name ?? "",
			number: raw.number ?? null,
			balance: raw.balance ?? 0,
			currencyCode: raw.currencyCode ?? "BRL",
			creditLimit: raw.creditData?.creditLimit ?? null,
			availableCreditLimit: raw.creditData?.availableCreditLimit ?? null,
			cardBrand: raw.creditData?.brand ?? null,
			cardLevel: raw.creditData?.level ?? null,
		};
	}

	private static mapTransaction(
		raw: PluggyTransactionResponse,
	): GatewayTransaction {
		return {
			providerTransactionId: raw.id,
			date: new Date(raw.date),
			description: raw.description ?? "",
			amount: raw.amount ?? 0,
			type: raw.type === "CREDIT" ? "CREDIT" : "DEBIT",
			status: raw.status === "PENDING" ? "PENDING" : "POSTED",
			operationType: raw.operationType ?? null,
			currencyCode: raw.currencyCode ?? "BRL",
			categoryName: raw.category ?? null,
		};
	}

	private static mapBill(raw: PluggyBillResponse): GatewayBill {
		return {
			providerBillId: raw.id ?? null,
			dueDate: new Date(raw.dueDate),
			closeDate: new Date(raw.closeDate),
			totalAmount: raw.totalAmount ?? 0,
			minimumPayment: raw.minimumPayment ?? null,
			status: "OPEN",
		};
	}
}
