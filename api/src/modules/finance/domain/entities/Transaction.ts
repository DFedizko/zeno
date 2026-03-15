import type { Decimal } from "@/generated/prisma/runtime/library";
import type { Money } from "@/modules/finance/domain/value-objects/Money";

export type TransactionType = "DEBIT" | "CREDIT";
export type TransactionStatus = "PENDING" | "POSTED";

export class Transaction {
	private constructor(
		private readonly _date: Date,
		private readonly _description: string,
		private readonly _amount: Money,
		private readonly _type: TransactionType,
		private readonly _status: TransactionStatus,
		private readonly _providerTransactionId: string,
		private readonly _operationType?: string,
		private readonly _categoryId?: string,
	) {}

	public static create(
		date: Date,
		description: string,
		amount: Money,
		type: TransactionType,
		status: TransactionStatus,
		providerTransactionId: string,
		operationType?: string,
		categoryId?: string,
	) {
		return new Transaction(
			date,
			description,
			amount,
			type,
			status,
			providerTransactionId,
			operationType,
			categoryId,
		);
	}

	public static toOutput(row: {
		id: string;
		financialAccountId: string;
		providerTransactionId: string;
		date: Date;
		description: string;
		amount: Decimal;
		type: string;
		status: string;
		operationType: string | null;
		categoryId: string | null;
		currencyCode: string;
		createdAt: Date;
		updatedAt: Date;
	}) {
		return {
			id: row.id,
			financialAccountId: row.financialAccountId,
			date: row.date.toISOString(),
			description: row.description,
			amount: Number(row.amount),
			type: row.type as "DEBIT" | "CREDIT",
			status: row.status as "PENDING" | "POSTED",
			operationType: row.operationType,
			categoryId: row.categoryId,
			currencyCode: row.currencyCode,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}

	public static toListOutput(row: {
		id: string;
		financialAccountId: string;
		date: Date;
		description: string;
		amount: Decimal;
		type: string;
		status: string;
		operationType: string | null;
		categoryId: string | null;
		currencyCode: string;
		category: { id: string; name: string; color: string | null } | null;
	}) {
		return {
			id: row.id,
			financialAccountId: row.financialAccountId,
			date: row.date.toISOString(),
			description: row.description,
			amount: Number(row.amount),
			type: row.type as "DEBIT" | "CREDIT",
			status: row.status as "PENDING" | "POSTED",
			operationType: row.operationType,
			categoryId: row.categoryId,
			categoryName: row.category?.name ?? null,
			categoryColor: row.category?.color ?? null,
			currencyCode: row.currencyCode,
		};
	}

	public get date() {
		return this._date;
	}

	public get description() {
		return this._description;
	}

	public get amount() {
		return this._amount;
	}

	public get type() {
		return this._type;
	}

	public get status() {
		return this._status;
	}

	public get providerTransactionId() {
		return this._providerTransactionId;
	}

	public get operationType() {
		return this._operationType;
	}

	public get categoryId() {
		return this._categoryId;
	}

	public get isDebit(): boolean {
		return this._type === "DEBIT";
	}

	public get isCredit(): boolean {
		return this._type === "CREDIT";
	}

	public get isPending(): boolean {
		return this._status === "PENDING";
	}
}
