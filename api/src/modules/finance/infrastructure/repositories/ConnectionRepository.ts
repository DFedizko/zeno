import { randomUUID } from "node:crypto";
import { prisma } from "@/database/prisma";
import type { IConnectionRepository } from "./IConnectionRepository";
import type {
	ConnectionOutput,
	ConnectionInput,
} from "@/routes/finance/financeSchema";
import { Connection } from "@/modules/finance/domain/entities/Connection";
import { ConnectionNotFound } from "@/modules/finance/infrastructure/errors/ConnectionNotFound";
import type { ConnectionStatus } from "@/generated/prisma/client";

export class ConnectionRepository implements IConnectionRepository {
	async findByUserId(userId: string): Promise<ConnectionOutput[]> {
		const rows = await prisma.connection.findMany({
			where: { userId },
			orderBy: { createdAt: "desc" },
		});
		return rows.map(Connection.toOutput);
	}

	async findById(id: string): Promise<ConnectionOutput> {
		const row = await prisma.connection.findUnique({ where: { id } });
		if (!row) throw new ConnectionNotFound();
		return Connection.toOutput(row);
	}

	async findByProviderItemId(
		providerItemId: string,
	): Promise<ConnectionOutput> {
		const row = await prisma.connection.findUnique({
			where: { providerItemId },
		});
		if (!row) throw new ConnectionNotFound();
		return Connection.toOutput(row);
	}

	async create(
		userId: string,
		input: ConnectionInput,
	): Promise<ConnectionOutput> {
		const connection = Connection.create(
			input.provider,
			input.providerItemId,
			input.connectorName,
			input.connectorImageUrl ?? undefined,
			input.connectorColor ?? undefined,
		);

		const row = await prisma.connection.create({
			data: {
				id: randomUUID(),
				userId,
				provider: connection.provider,
				providerItemId: connection.providerItemId,
				connectorName: connection.connectorName,
				connectorImageUrl: connection.connectorImageUrl ?? null,
				connectorColor: connection.connectorColor ?? null,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		});
		return Connection.toOutput(row);
	}

	async updateStatus(
		id: string,
		status: string,
		lastSyncAt?: Date,
	): Promise<ConnectionOutput> {
		const row = await prisma.connection.update({
			where: { id },
			data: {
				status: status as ConnectionStatus,
				...(lastSyncAt && { lastSyncAt }),
				updatedAt: new Date(),
			},
		});
		return Connection.toOutput(row);
	}

	async delete(id: string): Promise<void> {
		await prisma.connection.delete({ where: { id } });
	}
}
