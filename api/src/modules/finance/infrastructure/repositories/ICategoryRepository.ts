import type { CategoryOutput } from "@/routes/finance/financeSchema";

export interface ICategoryRepository {
	findAll(): Promise<CategoryOutput[]>;
	findById(id: string): Promise<CategoryOutput>;
	findOrCreateByName(name: string): Promise<CategoryOutput>;
}
