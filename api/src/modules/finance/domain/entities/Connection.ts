export class Connection {
	private constructor(
		private readonly _provider: string,
		private readonly _providerItemId: string,
		private readonly _connectorName: string,
		private readonly _connectorImageUrl?: string,
		private readonly _connectorColor?: string,
	) {}

	public static create(
		provider: string,
		providerItemId: string,
		connectorName: string,
		connectorImageUrl?: string,
		connectorColor?: string,
	) {
		return new Connection(
			provider,
			providerItemId,
			connectorName,
			connectorImageUrl,
			connectorColor,
		);
	}

	public static toOutput(row: {
		id: string;
		userId: string;
		provider: string;
		providerItemId: string;
		connectorName: string;
		connectorImageUrl: string | null;
		connectorColor: string | null;
		status: string;
		lastSyncAt: Date | null;
		createdAt: Date;
		updatedAt: Date;
	}) {
		return {
			id: row.id,
			userId: row.userId,
			provider: row.provider,
			providerItemId: row.providerItemId,
			connectorName: row.connectorName,
			connectorImageUrl: row.connectorImageUrl,
			connectorColor: row.connectorColor,
			status: row.status as
				| "UPDATING"
				| "UPDATED"
				| "ERROR"
				| "WAITING_USER_INPUT",
			lastSyncAt: row.lastSyncAt?.toISOString() ?? null,
			createdAt: row.createdAt.toISOString(),
			updatedAt: row.updatedAt.toISOString(),
		};
	}

	public get provider() {
		return this._provider;
	}

	public get providerItemId() {
		return this._providerItemId;
	}

	public get connectorName() {
		return this._connectorName;
	}

	public get connectorImageUrl() {
		return this._connectorImageUrl;
	}

	public get connectorColor() {
		return this._connectorColor;
	}
}
