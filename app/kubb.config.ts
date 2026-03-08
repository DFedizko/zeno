import { defineConfig } from "@kubb/core";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginClient } from "@kubb/plugin-client";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginFaker } from "@kubb/plugin-faker";

export default defineConfig({
	root: ".",
	input: {
		path: "./openapi.json",
	},
	output: {
		path: "./src/gen",
		clean: true,
	},
	plugins: [
		pluginOas(),
		pluginTs({
			// exclude: [
			// 	{
			// 		type: "tag",
			// 		pattern: "admin",
			// 	},
			// ],
			output: {
				path: "models",
			},
		}),
		pluginClient({
			output: {
				path: "clients",
			},
		}),
		pluginReactQuery({
			output: {
				path: "hooks",
			},
		}),
		pluginZod({
			output: {
				path: "zod",
			},
		}),
		pluginFaker({
			output: {
				path: "mocks",
			},
		}),
	],
});
