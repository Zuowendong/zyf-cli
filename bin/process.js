import path from "path";

import { createConfig } from "./config.js";
import question from "./question/index.js";
import creation from "./utils/creation.js";

const answer = await question();
export const config = createConfig(answer);

export function getRootPath() {
	return path.resolve(process.cwd(), config.packageName);
}

const creationProcess = {
	folder_package: {
		msg: "Create a folder",
		filePath: getRootPath(),
	},
	folder_src: {
		msg: "Create a src folder",
		filePath: `${getRootPath()}/src`,
	},
	folder_components: {
		msg: "Create a components folder",
		filePath: `${getRootPath()}/src/components`,
	},
	folder_tests: {
		msg: "Create a tests folder",
		filePath: `${getRootPath()}/tests`,
		middleware: "vitest",
	},
	folder_router: {
		msg: "Create a router folder",
		filePath: `${getRootPath()}/src/router`,
		middleware: "vueRouter",
	},
	folder_views: {
		msg: "Create a views folder",
		filePath: `${getRootPath()}/src/views`,
		middleware: "vueRouter",
	},
	folder_stores: {
		msg: "Create a stores folder",
		filePath: `${getRootPath()}/src/stores`,
		middleware: "pinia",
	},
	file_html: {
		msg: "Create an HTML file",
		filePath: `${getRootPath()}/index.html`,
		template: () => import("./createTemp/createIndexHtmlTemplate.js"),
	},
	file_viteConfig: {
		msg: "Create the vite.config.js file",
		filePath: `${getRootPath()}/vite.config.js`,
		template: () => import("./createTemp/createViteConfigJsTemplate.js"),
	},
	file_manJS: {
		msg: "Create the main.js file",
		filePath: `${getRootPath()}/src/main.js`,
		template: () => import("./createTemp/createMainJsTemplate.js"),
	},
	file_appVue: {
		msg: "Create the App.vue file",
		filePath: `${getRootPath()}/src/App.vue`,
		template: () => import("./createTemp/createAppVueTemplate.js"),
	},
	file_package: {
		msg: "Create package.json",
		filePath: `${getRootPath()}/package.json`,
		template: () => import("./createTemp/createPackageTemplate.js"),
	},
	file_helloWorld: {
		msg: "Create the HelloWorld.vue file",
		filePath: `${getRootPath()}/src/components/HelloWorld.vue`,
		template: () => import("./createTemp/createComponentTemplate.js"),
	},
	file_vitest: {
		msg: "Create the index.spec.js file",
		filePath: `${getRootPath()}/tests/index.spec.js`,
		middleware: "vitest",
		template: () => import("./createTemp/createUnitTestTemplate.js"),
	},
	file_addJs: {
		msg: "Create the add.js file",
		filePath: `${getRootPath()}/src/add.js`,
		middleware: "vitest",
		template: () => import("./createTemp/createAddJsTemplate.js"),
	},
	file_router: {
		msg: "Create the router file",
		filePath: `${getRootPath()}/src/router/index.js`,
		middleware: "vueRouter",
		template: () => import("./createTemp/createRouterTemplate.js"),
	},
	file_homeVue: {
		msg: "Create the home.vue file",
		filePath: `${getRootPath()}/src/views/home.vue`,
		middleware: "vueRouter",
		template: () => import("./createTemp/createHomeVueTemplate.js"),
	},
	file_aboutVue: {
		msg: "Create the about.vue file",
		filePath: `${getRootPath()}/src/views/about.vue`,
		middleware: "vueRouter",
		template: () => import("./createTemp/createAboutVueTemplate.js"),
	},
	file_pinia: {
		msg: "Create the store file",
		filePath: `${getRootPath()}/src/stores/index.js`,
		middleware: "pinia",
		template: () => import("./createTemp/createPiniaTemplate.js"),
	},
	file_todoVue: {
		msg: "Create the todo.vue file",
		filePath: `${getRootPath()}/src/components/Todo.vue`,
		middleware: "pinia",
		template: () => import("./createTemp/createTodoTemplate.js"),
	},
};

export async function executeCreationProcess() {
	let middlewareprocess = {}; // 选填安装
	let essentialprocess = {}; // 必装
	Object.keys(creationProcess).forEach((key) => {
		const creationVal = creationProcess[key];
		if (creationVal.middleware) {
			middlewareprocess[key] = creationVal;
		} else {
			essentialprocess[key] = creationVal;
		}
	});

	Object.keys(essentialprocess).forEach((essentialKey) => {
		const opType = essentialKey.split("_")[0];
		if (opType === "folder") {
			creation.createFolder(essentialprocess[essentialKey]);
		} else if (opType === "file") {
			creation.createFile({
				...essentialprocess[essentialKey],
				config,
			});
		}
	});

	Object.keys(middlewareprocess).forEach((middlewareKey) => {
		const opType = middlewareKey.split("_")[0];
		const middlewareVal = middlewareprocess[middlewareKey];
		if (config.middleware[middlewareVal.middleware]) {
			if (opType === "folder") {
				creation.createFolder(middlewareVal);
			} else if (opType === "file") {
				creation.createFile({
					...middlewareVal,
					config,
				});
			}
		}
	});
}
