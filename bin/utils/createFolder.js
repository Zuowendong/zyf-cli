import fs from "fs";
import chalk from "chalk";

export default function createFolder(chalkMsg, fileUrl) {
	console.log(chalk.blue(chalkMsg));
	fs.mkdirSync(fileUrl);
}
