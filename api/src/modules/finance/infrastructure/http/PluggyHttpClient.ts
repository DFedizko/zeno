import { HttpClient } from "@/shared/http/HttpClient";

const PLUGGY_BASE_URL = "https://api.pluggy.ai";

interface PluggyAuthResponse {
	apiKey: string;
}

export class PluggyHttpClient extends HttpClient {
	private accessToken: string | null = null;
	private tokenExpiresAt: Date | null = null;

	constructor() {
		super({ baseUrl: PLUGGY_BASE_URL });

		this.client.interceptors.request.use(async (config) => {
			if (config.url === "/auth") return config;

			await this.authenticate();
			config.headers.set("X-API-KEY", this.accessToken);
			return config;
		});
	}

	private async authenticate(): Promise<void> {
		if (
			this.accessToken &&
			this.tokenExpiresAt &&
			this.tokenExpiresAt > new Date()
		) {
			return;
		}

		const clientId = process.env.PLUGGY_CLIENT_ID;
		const clientSecret = process.env.PLUGGY_CLIENT_SECRET;

		const data = await this.post<PluggyAuthResponse>("/auth", {
			clientId,
			clientSecret,
		});

		this.accessToken = data.apiKey;
		this.tokenExpiresAt = new Date(Date.now() + 110 * 60 * 1000);
	}
}
