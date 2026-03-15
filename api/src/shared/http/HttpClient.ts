import axios, { type AxiosInstance } from "axios";

interface HttpClientConfig {
	baseUrl: string;
}

export class HttpClient {
	protected readonly client: AxiosInstance;

	constructor(config: HttpClientConfig) {
		this.client = axios.create({
			baseURL: config.baseUrl,
			headers: { "Content-Type": "application/json" },
		});
	}

	public setAuthHeader(
		token: string,
		headerName = "Authorization",
		prefix?: string,
	): void {
		this.client.defaults.headers.common[headerName] = prefix
			? `${prefix} ${token}`
			: token;
	}

	public async get<Output>(
		endpoint: string,
		params?: Record<string, unknown>,
	): Promise<Output> {
		const response = await this.client.get<Output>(endpoint, { params });
		return response.data;
	}

	public async post<Output>(
		endpoint: string,
		body?: unknown,
	): Promise<Output> {
		const response = await this.client.post<Output>(endpoint, body);
		return response.data;
	}

	public async put<Output>(
		endpoint: string,
		body?: unknown,
	): Promise<Output> {
		const response = await this.client.put<Output>(endpoint, body);
		return response.data;
	}

	public async patch<Output>(
		endpoint: string,
		body?: unknown,
	): Promise<Output> {
		const response = await this.client.patch<Output>(endpoint, body);
		return response.data;
	}

	public async delete<Output>(endpoint: string): Promise<Output> {
		const response = await this.client.delete<Output>(endpoint);
		return response.data;
	}
}
