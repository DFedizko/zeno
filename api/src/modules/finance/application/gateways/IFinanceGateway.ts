import type {
	AccountSubtype,
	AccountType,
} from "@/modules/finance/domain/entities/FinancialAccount";
import type {
	TransactionStatus,
	TransactionType,
} from "@/modules/finance/domain/entities/Transaction";
import type { BillStatus } from "@/modules/finance/domain/entities/CreditCardBill";

export interface GatewayConnectToken {
	connectToken: string;
}

export interface GatewayItem {
	providerItemId: string;
	connectorName: string;
	connectorImageUrl: string | null;
	connectorColor: string | null;
	status: string;
}

export interface GatewayAccount {
	providerAccountId: string;
	type: AccountType;
	subtype: AccountSubtype;
	name: string;
	number: string | null;
	balance: number;
	currencyCode: string;
	creditLimit: number | null;
	availableCreditLimit: number | null;
	cardBrand: string | null;
	cardLevel: string | null;
}

export interface GatewayTransaction {
	providerTransactionId: string;
	date: Date;
	description: string;
	amount: number;
	type: TransactionType;
	status: TransactionStatus;
	operationType: string | null;
	currencyCode: string;
	categoryName: string | null;
}

export interface GatewayBill {
	providerBillId: string | null;
	dueDate: Date;
	closeDate: Date;
	totalAmount: number;
	minimumPayment: number | null;
	status: BillStatus;
}

export interface IFinanceGateway {
	createConnectToken(itemId?: string): Promise<GatewayConnectToken>;
	getItem(providerItemId: string): Promise<GatewayItem>;
	getAccounts(providerItemId: string): Promise<GatewayAccount[]>;
	getTransactions(
		providerAccountId: string,
		from: Date,
		to: Date,
	): Promise<GatewayTransaction[]>;
	getBills(providerAccountId: string): Promise<GatewayBill[]>;
}
