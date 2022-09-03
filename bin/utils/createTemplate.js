import ejs from "ejs";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from "url";

export default (fileUrl, config, prettierType) => {
	const __dirname = fileURLToPath(import.meta.url);
	const template = fs.readFileSync(path.resolve(__dirname, fileUrl));
	const code = ejs.render(template.toString(), config);
	return prettier.format(code, { parser: prettierType });
};
