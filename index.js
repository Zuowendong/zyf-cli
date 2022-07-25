// fs
import fs from "fs";
import createIndexTemplate from './createIndexTemplate.js'

// 1. 创建文件夹 -> hei
fs.mkdirSync(getRootPath());
// 2. 创建入口文件 -> index.js
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate());
// 3. 创建package.json
fs.writeFileSync(`${getRootPath()}/package.json`, "package-test");
// 4. 安装依赖
// Todo

function getRootPath() {
    return "./hei";
}
