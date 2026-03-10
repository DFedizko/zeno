import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/index.ts"],
	format: ["esm"],
	clean: true,
	esbuildOptions(options) {
		options.loader = {
			...options.loader,
			".md": "empty",
		};
	},
});
