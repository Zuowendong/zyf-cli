// fs
import fs from "fs";

import createIndexTemplate from "./createIndexTemplate.js";
import createPackageTemplate from "./createPackageTemplate.js";
import question from "./question/index.js";
// input
// process
// output

const answer = await question();
console.log(answer);

const inputConfig = {
    packageName: "hei",
    port: 8080,
    middleware: {
        static: true,
        router: false,
    },
};

// 1. 创建文件夹 -> hei
// fs.mkdirSync(getRootPath());
// // 2. 创建入口文件 -> index.js
// fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(inputConfig));
// // 3. 创建package.json
// fs.writeFileSync(
//     `${getRootPath()}/package.json`,
//     createPackageTemplate(inputConfig)
// );
// // 4. 安装依赖
// // Todo

// function getRootPath() {
//     return "./hei";
// }
