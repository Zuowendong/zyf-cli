#! /usr/bin/env node

import fs from "fs";
import path from "path";
import { execa } from "execa";
import chalk from "chalk";
import question from "./question/index.js";
import { createConfig } from "./config.js";

import createIndexHtmlTemplate from "./createTemp/createIndexHtmlTemplate.js";
import createMainJsTemplate from "./createTemp/createMainJsTemplate.js";
import createViteConfigJsTemplate from "./createTemp/createViteConfigJsTemplate.js";
import createAppVueTemplate from "./createTemp/createAppVueTemplate.js";
import createPackageTemplate from "./createTemp/createPackageTemplate.js";

import createFolder from "./utils/createFolder.js";
import createFile from "./utils/createFile.js";

const answer = await question();
const config = createConfig(answer);

createFolder("Create a folder", getRootPath());
createFile("Creating an HTML file", `${getRootPath()}/index.html`, createIndexHtmlTemplate(config));
createFile("Create the vite.config.js file", `${getRootPath()}/vite.config.js`, createViteConfigJsTemplate(config));

createFolder("Create a src folder", `${getRootPath()}/src`);
createFile("Create the main.js file", `${getRootPath()}/src/main.js`, createMainJsTemplate(config));
createFile("Create the main.js file", `${getRootPath()}/src/App.vue`, createAppVueTemplate(config));

createFile("Create package.json", `${getRootPath()}/package.json`, createPackageTemplate(config));

console.log(chalk.blue(`Install dependencies`));
execa("npm install", {
	cwd: getRootPath(),
	stdio: [2, 2, 2],
});

function getRootPath() {
	return path.resolve(process.cwd(), config.packageName);
}
