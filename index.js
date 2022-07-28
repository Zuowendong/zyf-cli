// fs
import fs from "fs";
import { execa } from "execa";

import createIndexTemplate from "./createIndexTemplate.js";
import createPackageTemplate from "./createPackageTemplate.js";
import question from "./question/index.js";
import { createConfig } from "./config.js";
// input
// process
// output

const answer = await question();
const config = createConfig(answer);

// 1. 创建文件夹 -> hei
fs.mkdirSync(getRootPath());
// 2. 创建入口文件 -> index.js
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config));
// 3. 创建package.json
fs.writeFileSync(
    `${getRootPath()}/package.json`,
    createPackageTemplate(config)
);
// 4. 安装依赖 ： 官方库：child-process子进程    第三方库： execa (child-process子进程 库的封装)
// Todo
execa("npm install", {
    cwd: getRootPath(),
    stdio: [2, 2, 2],
});

function getRootPath() {
    return "./hei";
}
