import type { Decimal } from "@/generated/prisma/runtime/library";
import type { Money } from "@/modules/finance/domain/value-objects/Money";

export type AccountType = "BANK" | "CREDIT";
export type AccountSubtype = "CHECKING" | "SAVINGS" | "CREDIT_CARD";

export class FinancialAccount {
	private constructor(
		private readonly _type: AccountType,
		private readonly _subtype: AccountSubtype,
		private readonly _name: string,
		private readonly _balance: Money,
		private readonly _providerAccountId: string,
		private readonly _number?: string,
		private readonly _creditLimit?: Money,
		private readonly _availableCreditLimit?: Money,
		private readonly _cardBrand?: string,
		private readonly _cardLevel?: string,
	) {}

	public static create(
		type: AccountType,
		subtype: AccountSubtype,
		name: string,
		balance: Money,
		providerAccountId: string,
		number?: string,
		creditLimit?: Money,
		availableCreditLimit?: Money,
		cardBrand?: string,
		cardLevel?: string,
	) {
		return new FinancialAccount(
			type,
			subtype,
			name,
			balance,
			providerAccountId,
			number,
			creditLimit,
			availableCreditLimit,
			cardBrand,
			cardLevel,
		);
	}

	public static toOutput(row: {
		id: string;
		connectionId: string;
		providerAccountId: string;
		type: string;
		subtype: string;
		name: string;
		number: string | null;
		balance: Decimal;
		currencyCode: string;
		creditLimit: Decimal | null;
		availableCreditLimit: Decimal | null;
		cardBrand: string | null;
		cardLevel: string | null;
		createdAt: Date;
		updatedAt: Date;
	}) {
		return {
			id: row.id,
			connectionId: row.connectionId,
			type: row.type as "BANK" | "CREDIT",
			subtype: row.subtype as "CHECKING" | "SAVINGS" | "CREDIT_CARD",
			name: row.name,
			number: row.number,
			balance: Number(row.balance),
			currencyCode: row.currencyCode,
			creditLimit: row.creditLimit ? Number(row.creditLimit) : null,
			availableCreditLimit: row.availableCreditLimit
				? Number(row.availableCreditLimit)
				: null,
			cardBrand: row.cardBrand,
			cardLevel: row.cardLevel,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}

	public get type() {
		return this._type;
	}

	public get subtype() {
		return this._subtype;
	}

	public get name() {
		return this._name;
	}

	public get number() {
		return this._number;
	}

	public get balance() {
		return this._balance;
	}

	public get providerAccountId() {
		return this._providerAccountId;
	}

	public get creditLimit() {
		return this._creditLimit;
	}

	public get availableCreditLimit() {
		return this._availableCreditLimit;
	}

	public get cardBrand() {
		return this._cardBrand;
	}

	public get cardLevel() {
		return this._cardLevel;
	}

	public get isCreditCard(): boolean {
		return this._subtype === "CREDIT_CARD";
	}

	public get isBankAccount(): boolean {
		return this._type === "BANK";
	}
}
