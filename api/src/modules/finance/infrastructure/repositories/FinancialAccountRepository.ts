import { randomUUID } from "node:crypto";
import { prisma } from "@/database/prisma";
import type { IFinancialAccountRepository } from "./IFinancialAccountRepository";
import type {
	FinancialAccountOutput,
	FinancialAccountInput,
} from "@/routes/finance/financeSchema";
import { FinancialAccount } from "@/modules/finance/domain/entities/FinancialAccount";
import { AccountNotFound } from "@/modules/finance/infrastructure/errors/AccountNotFound";
import type { AccountType, AccountSubtype } from "@/generated/prisma/client";

export class FinancialAccountRepository implements IFinancialAccountRepository {
	async findByConnectionId(
		connectionId: string,
	): Promise<FinancialAccountOutput[]> {
		const rows = await prisma.financialAccount.findMany({
			where: { connectionId },
		});
		return rows.map(FinancialAccount.toOutput);
	}

	async findByUserId(userId: string): Promise<FinancialAccountOutput[]> {
		const rows = await prisma.financialAccount.findMany({
			where: { connection: { userId } },
			orderBy: { createdAt: "desc" },
		});
		return rows.map(FinancialAccount.toOutput);
	}

	async findById(id: string): Promise<FinancialAccountOutput> {
		const row = await prisma.financialAccount.findUnique({ where: { id } });
		if (!row) throw new AccountNotFound();
		return FinancialAccount.toOutput(row);
	}

	async upsertByProviderAccountId(
		connectionId: string,
		input: FinancialAccountInput,
	): Promise<FinancialAccountOutput> {
		const data = {
			connectionId,
			type: input.type as AccountType,
			subtype: input.subtype as AccountSubtype,
			name: input.name,
			number: input.number ?? null,
			balance: input.balance,
			currencyCode: input.currencyCode,
			creditLimit: input.creditLimit ?? null,
			availableCreditLimit: input.availableCreditLimit ?? null,
			cardBrand: input.cardBrand ?? null,
			cardLevel: input.cardLevel ?? null,
			updatedAt: new Date(),
		};

		const row = await prisma.financialAccount.upsert({
			where: { providerAccountId: input.providerAccountId },
			update: data,
			create: {
				id: randomUUID(),
				providerAccountId: input.providerAccountId,
				...data,
				createdAt: new Date(),
			},
		});
		return FinancialAccount.toOutput(row);
	}

	async deleteByConnectionId(connectionId: string): Promise<void> {
		await prisma.financialAccount.deleteMany({ where: { connectionId } });
	}
}
