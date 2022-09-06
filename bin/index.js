#! /usr/bin/env node

import path, { join } from "path";
import { execa } from "execa";
import chalk from "chalk";

import { executeCreationProcess, getRootPath, config } from "./process.js";

executeCreationProcess();

console.log(chalk.blue(`Install dependencies...`));
await execa("npm install", {
	cwd: getRootPath(),
	stdio: [2, 2, 2],
});

console.log(chalk.blue(`cd ${config.packageName}`));
console.log(chalk.blue(`npm run dev`));
