// fs
import fs from "fs";

import createIndexTemplate from "./createIndexTemplate.js";
import createPackageTemplate from "./createPackageTemplate.js";
import question from "./question/index.js";
import { createConfig } from "./config.js";
// input
// process
// output

const answer = await question();
const config = createConfig(answer);

console.log(config);

// 1. 创建文件夹 -> hei
fs.mkdirSync(getRootPath());
// 2. 创建入口文件 -> index.js
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(config));
// 3. 创建package.json
fs.writeFileSync(
    `${getRootPath()}/package.json`,
    createPackageTemplate(config)
);
// 4. 安装依赖
// Todo

function getRootPath() {
    return "./hei";
}
