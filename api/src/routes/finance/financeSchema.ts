import { z } from "zod";

// ─── Enums ────────────────────────────────────────────────

const accountType = z.enum(["BANK", "CREDIT"]);
const accountSubtype = z.enum(["CHECKING", "SAVINGS", "CREDIT_CARD"]);
const transactionType = z.enum(["DEBIT", "CREDIT"]);
const transactionStatus = z.enum(["PENDING", "POSTED"]);
const connectionStatus = z.enum([
	"UPDATING",
	"UPDATED",
	"ERROR",
	"WAITING_USER_INPUT",
]);
const billStatus = z.enum(["OPEN", "CLOSED", "PAID"]);

// ─── Connection ───────────────────────────────────────────

const connectionInput = z.object({
	provider: z.string(),
	providerItemId: z.string(),
	connectorName: z.string(),
	connectorImageUrl: z.string().nullable().optional(),
	connectorColor: z.string().nullable().optional(),
});

const connectionOutput = z.object({
	id: z.string(),
	userId: z.string(),
	provider: z.string(),
	providerItemId: z.string(),
	connectorName: z.string(),
	connectorImageUrl: z.string().nullable(),
	connectorColor: z.string().nullable(),
	status: connectionStatus,
	lastSyncAt: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

// ─── Financial Account ────────────────────────────────────

const financialAccountInput = z.object({
	providerAccountId: z.string(),
	type: accountType,
	subtype: accountSubtype,
	name: z.string(),
	number: z.string().nullable().optional(),
	balance: z.number(),
	currencyCode: z.string().default("BRL"),
	creditLimit: z.number().nullable().optional(),
	availableCreditLimit: z.number().nullable().optional(),
	cardBrand: z.string().nullable().optional(),
	cardLevel: z.string().nullable().optional(),
});

const financialAccountOutput = z.object({
	id: z.string(),
	connectionId: z.string(),
	type: accountType,
	subtype: accountSubtype,
	name: z.string(),
	number: z.string().nullable(),
	balance: z.number(),
	currencyCode: z.string(),
	creditLimit: z.number().nullable(),
	availableCreditLimit: z.number().nullable(),
	cardBrand: z.string().nullable(),
	cardLevel: z.string().nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

// ─── Transaction ──────────────────────────────────────────

const transactionInput = z.object({
	providerTransactionId: z.string(),
	date: z.coerce.date(),
	description: z.string(),
	amount: z.number(),
	type: transactionType,
	status: transactionStatus,
	operationType: z.string().nullable().optional(),
	currencyCode: z.string().default("BRL"),
	categoryName: z.string().nullable().optional(),
});

const transactionOutput = z.object({
	id: z.string(),
	financialAccountId: z.string(),
	date: z.string(),
	description: z.string(),
	amount: z.number(),
	type: transactionType,
	status: transactionStatus,
	operationType: z.string().nullable(),
	categoryId: z.string().nullable(),
	currencyCode: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
});

const transactionListOutput = z.object({
	id: z.string(),
	financialAccountId: z.string(),
	date: z.string(),
	description: z.string(),
	amount: z.number(),
	type: transactionType,
	status: transactionStatus,
	operationType: z.string().nullable(),
	categoryId: z.string().nullable(),
	categoryName: z.string().nullable(),
	categoryColor: z.string().nullable(),
	currencyCode: z.string(),
});

const transactionListQuery = z.object({
	from: z.coerce.date().optional(),
	to: z.coerce.date().optional(),
	categoryId: z.string().optional(),
	type: transactionType.optional(),
	page: z.coerce.number().int().min(1).default(1),
	pageSize: z.coerce.number().int().min(1).max(500).default(50),
});

const paginatedTransactionOutput = z.object({
	results: z.array(transactionListOutput),
	total: z.number(),
	page: z.number(),
	totalPages: z.number(),
});

// ─── Category ─────────────────────────────────────────────

const categoryOutput = z.object({
	id: z.string(),
	name: z.string(),
	icon: z.string().nullable(),
	color: z.string().nullable(),
});

// ─── Credit Card Bill ─────────────────────────────────────

const creditCardBillInput = z.object({
	providerBillId: z.string().nullable().optional(),
	dueDate: z.coerce.date(),
	closeDate: z.coerce.date(),
	totalAmount: z.number(),
	minimumPayment: z.number().nullable().optional(),
	status: billStatus.default("OPEN"),
});

const creditCardBillOutput = z.object({
	id: z.string(),
	financialAccountId: z.string(),
	dueDate: z.string(),
	closeDate: z.string(),
	totalAmount: z.number(),
	minimumPayment: z.number().nullable(),
	status: billStatus,
	createdAt: z.string(),
	updatedAt: z.string(),
});

// ─── Connect Token ────────────────────────────────────────

const connectTokenOutput = z.object({
	connectToken: z.string(),
});

// ─── Webhook ──────────────────────────────────────────────

const webhookInput = z.object({
	event: z.string(),
	itemId: z.string().optional(),
	transactionIds: z.array(z.string()).optional(),
});

// ─── Params ───────────────────────────────────────────────

const idParams = z.object({ id: z.string() });
const connectionIdParams = z.object({ connectionId: z.string() });
const accountIdParams = z.object({ accountId: z.string() });

// ─── Exports ──────────────────────────────────────────────

export const financeSchema = {
	connectionInput,
	connectionOutput,
	financialAccountInput,
	financialAccountOutput,
	transactionInput,
	transactionOutput,
	transactionListOutput,
	transactionListQuery,
	paginatedTransactionOutput,
	categoryOutput,
	creditCardBillInput,
	creditCardBillOutput,
	connectTokenOutput,
	webhookInput,
	idParams,
	connectionIdParams,
	accountIdParams,
};

export type ConnectionInput = z.infer<typeof connectionInput>;
export type ConnectionOutput = z.infer<typeof connectionOutput>;
export type FinancialAccountInput = z.infer<typeof financialAccountInput>;
export type FinancialAccountOutput = z.infer<typeof financialAccountOutput>;
export type TransactionInput = z.infer<typeof transactionInput>;
export type TransactionOutput = z.infer<typeof transactionOutput>;
export type TransactionListOutput = z.infer<typeof transactionListOutput>;
export type TransactionListQuery = z.infer<typeof transactionListQuery>;
export type PaginatedTransactionOutput = z.infer<
	typeof paginatedTransactionOutput
>;
export type CategoryOutput = z.infer<typeof categoryOutput>;
export type CreditCardBillInput = z.infer<typeof creditCardBillInput>;
export type CreditCardBillOutput = z.infer<typeof creditCardBillOutput>;
export type ConnectTokenOutput = z.infer<typeof connectTokenOutput>;
export type WebhookInput = z.infer<typeof webhookInput>;
export type IdParams = z.infer<typeof idParams>;
export type ConnectionIdParams = z.infer<typeof connectionIdParams>;
export type AccountIdParams = z.infer<typeof accountIdParams>;
