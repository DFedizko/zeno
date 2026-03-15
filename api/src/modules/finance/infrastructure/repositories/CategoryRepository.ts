import { randomUUID } from "node:crypto";
import { prisma } from "@/database/prisma";
import type { ICategoryRepository } from "./ICategoryRepository";
import type { CategoryOutput } from "@/routes/finance/financeSchema";
import { Category } from "@/modules/finance/domain/entities/Category";
import { CategoryNotFound } from "@/modules/finance/infrastructure/errors/CategoryNotFound";

export class CategoryRepository implements ICategoryRepository {
	async findAll(): Promise<CategoryOutput[]> {
		const rows = await prisma.category.findMany({
			orderBy: { name: "asc" },
		});
		return rows.map(Category.toOutput);
	}

	async findById(id: string): Promise<CategoryOutput> {
		const row = await prisma.category.findUnique({ where: { id } });
		if (!row) throw new CategoryNotFound();
		return Category.toOutput(row);
	}

	async findOrCreateByName(name: string): Promise<CategoryOutput> {
		const existing = await prisma.category.findUnique({
			where: { name },
		});
		if (existing) return Category.toOutput(existing);

		const row = await prisma.category.create({
			data: {
				id: randomUUID(),
				name,
			},
		});
		return Category.toOutput(row);
	}
}
