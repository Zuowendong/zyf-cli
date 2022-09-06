import fs from "fs";
import chalk from "chalk";

const Orange = chalk.hex("#FFA500");
class Creation {
	createFolder({ msg, filePath }) {
		console.log(chalk.yellow(msg));
		fs.mkdirSync(filePath);
	}

	async createFile({ msg, filePath, config, template }) {
		console.log(Orange(`${msg}...`));
		const render = await template();
		const tempStr = render.default(config);
		fs.writeFileSync(filePath, tempStr);
	}
}

export default new Creation();
