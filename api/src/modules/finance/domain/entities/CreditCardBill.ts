import type { Decimal } from "@/generated/prisma/runtime/library";
import type { Money } from "@/modules/finance/domain/value-objects/Money";

export type BillStatus = "OPEN" | "CLOSED" | "PAID";

export class CreditCardBill {
	private constructor(
		private readonly _dueDate: Date,
		private readonly _closeDate: Date,
		private readonly _totalAmount: Money,
		private readonly _status: BillStatus,
		private readonly _providerBillId?: string,
		private readonly _minimumPayment?: Money,
	) {}

	public static create(
		dueDate: Date,
		closeDate: Date,
		totalAmount: Money,
		status: BillStatus,
		providerBillId?: string,
		minimumPayment?: Money,
	) {
		return new CreditCardBill(
			dueDate,
			closeDate,
			totalAmount,
			status,
			providerBillId,
			minimumPayment,
		);
	}

	public static toOutput(row: {
		id: string;
		financialAccountId: string;
		dueDate: Date;
		closeDate: Date;
		totalAmount: Decimal;
		minimumPayment: Decimal | null;
		status: string;
		createdAt: Date;
		updatedAt: Date;
	}) {
		return {
			id: row.id,
			financialAccountId: row.financialAccountId,
			dueDate: row.dueDate.toISOString(),
			closeDate: row.closeDate.toISOString(),
			totalAmount: Number(row.totalAmount),
			minimumPayment: row.minimumPayment
				? Number(row.minimumPayment)
				: null,
			status: row.status as "OPEN" | "CLOSED" | "PAID",
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}

	public get dueDate() {
		return this._dueDate;
	}

	public get closeDate() {
		return this._closeDate;
	}

	public get totalAmount() {
		return this._totalAmount;
	}

	public get minimumPayment() {
		return this._minimumPayment;
	}

	public get status() {
		return this._status;
	}

	public get providerBillId() {
		return this._providerBillId;
	}

	public get isOpen(): boolean {
		return this._status === "OPEN";
	}

	public get isOverdue(): boolean {
		return this._status === "OPEN" && this._dueDate < new Date();
	}
}
