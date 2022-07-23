// fs
import fs from "fs";

// 1. 创建文件夹 -> hei
fs.mkdirSync("./hei");
// 2. 创建入口文件 -> index.js
fs.writeFileSync("./hei/index.js", "index");
// 3. 创建package.json
fs.writeFileSync("./hei/package.json", "package");
// 4. 安装依赖
// Todo
