import { randomUUID } from "node:crypto";
import { prisma } from "@/database/prisma";
import type { ITransactionRepository } from "./ITransactionRepository";
import type {
	TransactionOutput,
	TransactionListOutput,
	TransactionInput,
} from "@/routes/finance/financeSchema";
import { Transaction } from "@/modules/finance/domain/entities/Transaction";
import { TransactionNotFound } from "@/modules/finance/infrastructure/errors/TransactionNotFound";
import type {
	Prisma,
	TransactionType,
	TransactionStatus,
} from "@/generated/prisma/client";

export class TransactionRepository implements ITransactionRepository {
	async findByAccountId(
		accountId: string,
		filters?: {
			from?: Date;
			to?: Date;
			categoryId?: string;
			type?: string;
		},
	): Promise<TransactionListOutput[]> {
		const rows = await prisma.transaction.findMany({
			where: this.buildWhere({ financialAccountId: accountId }, filters),
			include: { category: true },
			orderBy: { date: "desc" },
		});
		return rows.map(Transaction.toListOutput);
	}

	async findByUserId(
		userId: string,
		filters?: {
			from?: Date;
			to?: Date;
			categoryId?: string;
			type?: string;
			page?: number;
			pageSize?: number;
		},
	): Promise<{
		results: TransactionListOutput[];
		total: number;
		page: number;
		totalPages: number;
	}> {
		const page = filters?.page ?? 1;
		const pageSize = filters?.pageSize ?? 50;

		const where = this.buildWhere(
			{ financialAccount: { connection: { userId } } },
			filters,
		);

		const [rows, total] = await Promise.all([
			prisma.transaction.findMany({
				where,
				include: { category: true },
				orderBy: { date: "desc" },
				skip: (page - 1) * pageSize,
				take: pageSize,
			}),
			prisma.transaction.count({ where }),
		]);

		return {
			results: rows.map(Transaction.toListOutput),
			total,
			page,
			totalPages: Math.ceil(total / pageSize),
		};
	}

	async findById(id: string): Promise<TransactionOutput> {
		const row = await prisma.transaction.findUnique({ where: { id } });
		if (!row) throw new TransactionNotFound();
		return Transaction.toOutput(row);
	}

	async upsertByProviderTransactionId(
		accountId: string,
		input: TransactionInput,
	): Promise<TransactionOutput> {
		const data = {
			financialAccountId: accountId,
			date: input.date,
			description: input.description,
			amount: input.amount,
			type: input.type as TransactionType,
			status: input.status as TransactionStatus,
			operationType: input.operationType ?? null,
			currencyCode: input.currencyCode,
			updatedAt: new Date(),
		};

		const row = await prisma.transaction.upsert({
			where: {
				providerTransactionId: input.providerTransactionId,
			},
			update: data,
			create: {
				id: randomUUID(),
				providerTransactionId: input.providerTransactionId,
				...data,
				createdAt: new Date(),
			},
		});
		return Transaction.toOutput(row);
	}

	async deleteByProviderTransactionId(
		providerTransactionId: string,
	): Promise<void> {
		await prisma.transaction.deleteMany({
			where: { providerTransactionId },
		});
	}

	async deleteByAccountId(accountId: string): Promise<void> {
		await prisma.transaction.deleteMany({
			where: { financialAccountId: accountId },
		});
	}

	private buildWhere(
		base: Prisma.TransactionWhereInput,
		filters?: {
			from?: Date;
			to?: Date;
			categoryId?: string;
			type?: string;
		},
	): Prisma.TransactionWhereInput {
		const dateFilter: Record<string, Date> = {};
		if (filters?.from) dateFilter.gte = filters.from;
		if (filters?.to) dateFilter.lte = filters.to;

		return {
			...base,
			...(Object.keys(dateFilter).length > 0 && { date: dateFilter }),
			...(filters?.categoryId && { categoryId: filters.categoryId }),
			...(filters?.type && { type: filters.type as TransactionType }),
		};
	}
}
