import fs from "fs";
import chalk from "chalk";

class Creation {
	createFolder({ msg, filePath }) {
		console.log(chalk.blue(msg));
		fs.mkdirSync(filePath);
	}

	async createFile({ msg, filePath, config, template }) {
		console.log(chalk.blue(`${msg}...`));
		const render = await template();
		const tempStr = render.default(config);
		fs.writeFileSync(filePath, tempStr);
	}
}

export default new Creation();
