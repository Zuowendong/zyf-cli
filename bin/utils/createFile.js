import fs from "fs";
import chalk from "chalk";

export default function createFile(chalkMsg, fileUrl, tempStr) {
	console.log(chalk.blue(chalkMsg));
	fs.writeFileSync(fileUrl, tempStr);
}
