import { randomUUID } from "node:crypto";
import { prisma } from "@/database/prisma";
import type { ICreditCardBillRepository } from "./ICreditCardBillRepository";
import type {
	CreditCardBillOutput,
	CreditCardBillInput,
} from "@/routes/finance/financeSchema";
import { CreditCardBill } from "@/modules/finance/domain/entities/CreditCardBill";
import { BillNotFound } from "@/modules/finance/infrastructure/errors/BillNotFound";
import type { BillStatus } from "@/generated/prisma/client";

export class CreditCardBillRepository implements ICreditCardBillRepository {
	async findByAccountId(accountId: string): Promise<CreditCardBillOutput[]> {
		const rows = await prisma.creditCardBill.findMany({
			where: { financialAccountId: accountId },
			orderBy: { dueDate: "desc" },
		});
		return rows.map(CreditCardBill.toOutput);
	}

	async findById(id: string): Promise<CreditCardBillOutput> {
		const row = await prisma.creditCardBill.findUnique({ where: { id } });
		if (!row) throw new BillNotFound();
		return CreditCardBill.toOutput(row);
	}

	async upsertByProviderBillId(
		accountId: string,
		input: CreditCardBillInput,
	): Promise<CreditCardBillOutput> {
		const data = {
			financialAccountId: accountId,
			dueDate: input.dueDate,
			closeDate: input.closeDate,
			totalAmount: input.totalAmount,
			minimumPayment: input.minimumPayment ?? null,
			status: (input.status ?? "OPEN") as BillStatus,
			updatedAt: new Date(),
		};

		if (input.providerBillId) {
			const row = await prisma.creditCardBill.upsert({
				where: { providerBillId: input.providerBillId },
				update: data,
				create: {
					id: randomUUID(),
					providerBillId: input.providerBillId,
					...data,
					createdAt: new Date(),
				},
			});
			return CreditCardBill.toOutput(row);
		}

		const row = await prisma.creditCardBill.create({
			data: {
				id: randomUUID(),
				providerBillId: null,
				...data,
				createdAt: new Date(),
			},
		});
		return CreditCardBill.toOutput(row);
	}
}
