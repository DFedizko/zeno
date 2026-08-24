import { writeFile } from "node:fs/promises";

const openApiUrl =
	process.env.ZENO_OPENAPI_URL ?? "http://localhost:3334/openapi.json";
const outputPath = new URL("../openapi.json", import.meta.url);

try {
	const response = await fetch(openApiUrl);

	if (!response.ok) {
		throw new Error(`The API responded with HTTP ${response.status}`);
	}

	const document = await response.json();

	if (!document.openapi || !document.paths) {
		throw new Error("The API response is not a valid OpenAPI document");
	}

	await writeFile(outputPath, `${JSON.stringify(document, null, 2)}\n`);
	console.log(`OpenAPI document saved from ${openApiUrl}`);
} catch (error) {
	const message = error instanceof Error ? error.message : String(error);
	console.error(`Could not download the OpenAPI document: ${message}`);
	console.error("Start the backend with `bun run dev` inside api and try again.");
	process.exitCode = 1;
}
