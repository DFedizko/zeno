import { z } from "zod";
import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { financeSchema } from "./financeSchema";
import { ErrorResponseSchemas } from "@/shared/schemas/ErrorResponseSchemas";
import { getConnections } from "./getConnections";
import { getAccounts } from "./getAccounts";
import { getTransactions } from "./getTransactions";
import { postCreateConnectToken } from "./postCreateConnectToken";
import { postSyncConnection } from "./postSyncConnection";
import { postWebhook } from "./postWebhook";

export const financeRoutes = async (app: FastifyTypedInstance) => {
	app.get(
		"/connections",
		{
			schema: {
				tags: ["finance"],
				description: "List all connections for the authenticated user",
				response: {
					200: z.array(financeSchema.connectionOutput),
					401: ErrorResponseSchemas.unauthorized,
				},
			},
			onRequest: [app.jwtAuth],
		},
		getConnections,
	);

	app.get(
		"/accounts",
		{
			schema: {
				tags: ["finance"],
				description:
					"List all financial accounts for the authenticated user",
				response: {
					200: z.array(financeSchema.financialAccountOutput),
					401: ErrorResponseSchemas.unauthorized,
				},
			},
			onRequest: [app.jwtAuth],
		},
		getAccounts,
	);

	app.get(
		"/transactions",
		{
			schema: {
				tags: ["finance"],
				description:
					"List transactions for the authenticated user with pagination and filters",
				querystring: financeSchema.transactionListQuery,
				response: {
					200: financeSchema.paginatedTransactionOutput,
					401: ErrorResponseSchemas.unauthorized,
				},
			},
			onRequest: [app.jwtAuth],
		},
		getTransactions,
	);

	app.post(
		"/connect-token",
		{
			schema: {
				tags: ["finance"],
				description: "Create a connect token for the Pluggy widget",
				body: z.object({ itemId: z.string().optional() }).optional(),
				response: {
					201: financeSchema.connectTokenOutput,
					401: ErrorResponseSchemas.unauthorized,
				},
			},
			onRequest: [app.jwtAuth],
		},
		postCreateConnectToken,
	);

	app.post(
		"/sync/:providerItemId",
		{
			schema: {
				tags: ["finance"],
				description:
					"Sync a connection by fetching data from the provider",
				params: z.object({ providerItemId: z.string() }),
				response: {
					200: financeSchema.connectionOutput,
					401: ErrorResponseSchemas.unauthorized,
					404: ErrorResponseSchemas.notFound.describe(
						"Connection not found.",
					),
				},
			},
			onRequest: [app.jwtAuth],
		},
		postSyncConnection,
	);

	app.post(
		"/webhook",
		{
			schema: {
				tags: ["finance"],
				description: "Handle webhook events from the finance provider",
				body: financeSchema.webhookInput,
				response: {
					204: z.undefined(),
					404: ErrorResponseSchemas.notFound.describe(
						"Connection not found.",
					),
				},
			},
		},
		postWebhook,
	);
};
