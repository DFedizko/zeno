import { fastify } from "fastify";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import {
	type ZodTypeProvider,
	validatorCompiler,
	serializerCompiler,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";
import ScalarApiReference from "@scalar/fastify-api-reference";
import { routes } from "./routes";

const PORT = 3333;

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
	origin: true,
	methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
	// credentials: true,
});

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Financial Management API Reference",
			description: "API for financial management.",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(ScalarApiReference, {
	routePrefix: "/docs",
	configuration: {
		theme: "bluePlanet",
	},
});

app.register(routes, { prefix: "/api" });

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
	console.log(`🔥 HTTP server running on http://localhost:${PORT}`);
	console.log(`📚 Docs available at http://localhost:${PORT}/docs`);
});
