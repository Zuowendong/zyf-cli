#! /usr/bin/env node

import { execa } from "execa";
import chalk from "chalk";

import { executeCreationProcess, getRootPath, config } from "./process.js";

executeCreationProcess();
console.log(chalk.gray(`=== creation process ending ===`));

if (config.install.toLowerCase().includes("y")) {
	console.log(chalk.blue(`Install dependencies...`));
	await execa("npm install", {
		cwd: getRootPath(),
		stdio: [2, 2, 2],
	});
	console.log(chalk.green(`cd ${config.packageName}`));
	console.log(chalk.green(`npm run dev`));
} else {
	console.log(chalk.green(`cd ${config.packageName}`));
	console.log(chalk.green(`pnpm install`));
	console.log(chalk.green(`pnpm dev`));
}
