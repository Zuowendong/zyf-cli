#! /usr/bin/env node

import path from "path";
import { execa } from "execa";
import chalk from "chalk";
import question from "./question/index.js";
import { createConfig } from "./config.js";

import createIndexHtmlTemplate from "./createTemp/createIndexHtmlTemplate.js";
import createMainJsTemplate from "./createTemp/createMainJsTemplate.js";
import createViteConfigJsTemplate from "./createTemp/createViteConfigJsTemplate.js";
import createUnitTestTemplate from "./createTemp/createUnitTestTemplate.js";
import createAppVueTemplate from "./createTemp/createAppVueTemplate.js";
import createPackageTemplate from "./createTemp/createPackageTemplate.js";
import createAddJsTemplate from "./createTemp/createAddJsTemplate.js";
import createComponentTemplate from "./createTemp/createComponentTemplate.js";

import createFolder from "./utils/createFolder.js";
import createFile from "./utils/createFile.js";

const answer = await question();
const config = createConfig(answer);

createFolder("Create a folder", getRootPath());
createFolder("Create a src folder", `${getRootPath()}/src`);
createFolder("Create a components folder", `${getRootPath()}/src/components`);

createFile("Creating an HTML file", `${getRootPath()}/index.html`, createIndexHtmlTemplate(config));
createFile("Create the vite.config.js file", `${getRootPath()}/vite.config.js`, createViteConfigJsTemplate(config));

if (config.middleware.vitest) {
	createFolder("Create a tests folder", `${getRootPath()}/tests`);
	createFile("Create the main.js file", `${getRootPath()}/tests/index.spec.js`, createUnitTestTemplate(config));
	createFile("Create the add.js file", `${getRootPath()}/src/add.js`, createAddJsTemplate(config));
}

createFile("Create the main.js file", `${getRootPath()}/src/main.js`, createMainJsTemplate(config));
createFile("Create the App.vue file", `${getRootPath()}/src/App.vue`, createAppVueTemplate(config));
createFile("Create the HelloWorld.vue file", `${getRootPath()}/src/components/HelloWorld.vue`, createComponentTemplate(config));

createFile("Create package.json", `${getRootPath()}/package.json`, createPackageTemplate(config));

console.log(chalk.blue(`Install dependencies...`));
execa("npm install", {
	cwd: getRootPath(),
	stdio: [2, 2, 2],
});

function getRootPath() {
	return path.resolve(process.cwd(), config.packageName);
}
