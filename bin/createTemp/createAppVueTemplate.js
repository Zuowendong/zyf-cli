import ejs from "ejs";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";

export default (config) => {
	const __dirname = fileURLToPath(import.meta.url);

	const template = fs.readFileSync(path.resolve(__dirname, "../../template/app-vue.ejs"));

	const code = ejs.render(template.toString(), {});

	// return prettier.format(code, { parser: "babel" });
	return code;
};
