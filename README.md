# zyf-cli

## 介绍

基于nodejs的cli工具

## 实现教程

### 创建项目

新建一个文件夹，根目录下执行指令 `npm init -y` 自动创建package.json文件，初始化项目。
package.json中新增一条`"type": "module"` 配置引用的文件作为ES模块进行加载。package.json文件内容如下：

```json
{
  "name": "zyf-cli",
  "version": "1.0.0",
  "description": "基于nodejs的cli工具",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git@gitee.com:wendZzoo/zyf-cli.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

根目录下新建index.js，作为入口文件。cli工具的整体的实现思路：

1. 创建文件夹
2. 创建入口文件
3. 创建package.json
4. 安装依赖

使用fs模块可以实现如上思路，index文件代码如下：

```js
import fs from "fs";
fs.mkdirSync("./demo");
fs.writeFileSync("./demo/index.js", "index");
fs.writeFileSync("./demo/package.json", "package");
// 4 todo 安装依赖
```

如上代码实现了，在根目录下创建了一个demo文件夹，在demo中新建了index.js，写入index, 新增package.json写入package

这时候在根目录下执行指令`node index.js` 就可以发现自动新建了一个demo文件夹，修改package中操作指令 `"test": "rm -rf ./demo && node index.js"` 之后就可以直接使用`npm run test`或`yarn test` 作为测试指令，这就是个cli工具的雏形。

### ejs创建模板文件

demo中的index和package文件中写入的内容，需要是我们提前定义的好模板，方便用户使用时候可以直接看到生成好的代码。

这里使用ejs，ejs 官方文档
> <https://ejs.bootcss.com/>

`npm install esj` 安装ejs

根目录下新建template文件夹，里面新建index.ejs, 安装vscode插件EJS language support可以让ejs代码高亮，这里就是最终想对用户展现的内容，代码如下：

```js
const koa = require('koa')
<% if (static) { %>
    const Router = require('koa-router')
  <% } %>
<% if (static) { %>
    const serve = require('koa-static')
  <% } %>
    const app = new koa()
<% if (static) { %>
    app.use(serve(__dirname + "/static"))
<% } %>
<% if (router) { %>
    const router = new Router()
    router.get("/", (ctx) => {
        ctx.body = 'Hello, koa-setup-test'
    })
    app.use(router.routes())
<% } %>
    app.listen(8080, () => {
        console.log('open server localhost:8080')
    })
```

根目录下新建 createIndexTemplate.js 封装index文件的模板内容生成方法，读取index.ejs中内容，通过ejs的render方法将生成的代码写入demo下的index.js, 代码如下：

```js
import ejs from 'ejs'
import fs from 'fs'
export default () => {
    const indexTemplate = fs.readFileSync("./template/index.ejs")
    const code = ejs.render(indexTemplate.toString(), {
        static: true,
        router: true
    })
    return code
};
```

改造一下index.js， 引入createIndexTemplate，代码如下：

```js
import fs from "fs";
import createIndexTemplate from './createIndexTemplate.js'
fs.mkdirSync(getRootPath());
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate());
fs.writeFileSync(`${getRootPath()}/package.json`, "package");
// 4 todo 安装依赖
function getRootPath() {
    return "./demo";
}
```

终端里执行指令`yarn test`， 查看demo下index内容，createIndexTemplate中修改`static: false, router: true`，再次执行指令，会发现demo下index内容有变化，koa-static相关代码不再显示。

相同的，改造一下demo下package.json里写入的代码。
template下新建package.ejs文件，代码如下：

```js
{
    "name": "<%= packageName %>",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "type": "module",
    "scripts": {
      "test": "echo \"Error: no test specified \" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": {
      "koa": "^2.13.1"
      <% if (middleware.router) { %>
        ,"koa-router": "^10.0.0"
      <% } %>
      <% if (middleware.static) { %>
        ,"koa-static": "^5.0.0"
      <% } %>
    }
}
```

新建createPackageTemplate.js, 代码如下：

```js
import ejs from 'ejs'
import fs from 'fs'
export default (config) => {
    const packageTemplate = fs.readFileSync("./template/package.ejs")
    const code = ejs.render(packageTemplate.toString(), {
        packageName: config.packageName,
        middleware: config.middleware
    })
    return code
};
```

改造index, 修改内容如下：

```js
import createPackageTemplate from "./createPackageTemplate.js";
const inputConfig = {
    packageName: "demo",
    port: 8080,
    middleware: {
        static: true,
        router: false,
    },
};
fs.writeFileSync(`${getRootPath()}/index.js`, createIndexTemplate(inputConfig));
fs.writeFileSync(`${getRootPath()}/package.json`, createPackageTemplate(inputConfig));
function getRootPath() {
    return path.resolve(process.cwd(), inputConfig.packageName)
}
```

抽离了输入的配置项inputConfig, 也要相应的修改一下createIndexTemplate中传入的参数

createIndexTemplate.js修改内容如下：

```js
export default (config) => {
    const indexTemplate = fs.readFileSync("./template/index.ejs")
    const code = ejs.render(indexTemplate.toString(), {
        middleware: config.middleware
    })
    return code
};
```

那相应的也要修改一下中的传入参数，修改的内容如下：

```js
const koa = require('koa')
<% if (middleware.static) { %>
    const Router = require('koa-router')
  <% } %>
<% if (middleware.static) { %>
    const serve = require('koa-static')
  <% } %>
    const app = new koa()
<% if (middleware.static) { %>
    app.use(serve(__dirname + "/static"))
<% } %>
<% if (middleware.router) { %>
    const router = new Router()
    router.get("/", (ctx) => {
        ctx.body = 'Hello, koa-setup-test'
    })
    app.use(router.routes())
<% } %>
    app.listen(8080, () => {
        console.log('open server localhost:8080')
    })
```

### 动态生成配置

通过`inquirer`插件交互式生成inputConfig

inquirer 文档：
> <https://www.npmjs.com/package/inquirer#documentation>

`npm install inquirer` 安装inquirer

修改index.js，代码如下：

```js
import fs from "fs";
import inquirer from "inquirer";
import createIndexTemplate from "./createIndexTemplate.js";
import createPackageTemplate from "./createPackageTemplate.js";
const r = await inquirer.prompt([
    /* Pass your questions in here */
    {
        type: "input",
        name: "packageName",
        message: "set package name",
        validate(val) {
            if (val) return true;
            return "please enter package name";
        },
    },
    {
        type: "input",
        name: "port",
        default() {
            return 8080;
        },
        message: "set port number",
    },
    {
        type: "checkbox",
        name: "middleware",
        choices: [{ name: "koaStatic" }, { name: "koaRouter" }],
    },
]);
console.log(r);
// 以下代码暂 注释
```

测试，终端执行`node index.js`, 出现交互式配置

配置项如果变多时，代码放在index就很不便于维护，根目录下新建question文件夹封装配置项
question下新建index.js，代码如下：

```js
import inquirer from "inquirer";
import packageName from "./packageName.js";
import port from "./port.js";
import middleware from "./middleware.js";
export default () => {
    return inquirer.prompt([
        /* Pass your questions in here */
        packageName(),
        port(),
        middleware(),
    ]);
}
```

新建packageName.js, 代码如下：

```js
export default () => {
    return {
        type: "input",
        name: "packageName",
        message: "set package name",
        validate(val) {
            if (val) return true;
            return "please enter package name";
        },
    };
};
```

新建middleware.js， 代码如下：

```js
export default () => {
    return {
        type: "checkbox",
        name: "middleware",
        choices: [{ name: "koaStatic" }, { name: "koaRouter" }],
    };
};
```

新建port.js， 代码如下：

```js
export default () => {
    return {
        type: "input",
        name: "port",
        default() {
            return 8080;
        },
        message: "set port number",
    };
};
```

根目录下新建config.js，封装配置文件，代码如下：

```js
export function createConfig(answer) {
    function haveMiddleware(name) {
        return answer.middleware.indexOf(name) !== -1;
    }
    return {
        packageName: answer.packageName,
        port: answer.port,
        middleware: {
            static: haveMiddleware("koaStatic"),
            router: haveMiddleware("koaRouter"),
        },
    };
}
```

修改根目录index.js， 修改内容如下：

```js
import question from "./question/index.js";
import { createConfig } from "./config.js";
const answer = await question();
const inputConfig = createConfig(answer);
console.log(inputConfig);
```

重复测试，输出结果一致，说明这里的代码抽离封装是没问题的, 可以放开下面代码的注释

### 依赖安装

使用execa插件进行package依赖的安装，execa是对node官方推荐库child-process子进程的二次封装，使用更加方便

execa文档：

> <https://www.npmjs.com/package/execa>

`npm install execa` 安装execa

修改index.js，修改内容如下：

```js
import { execa } from "execa";
// 4. Todo
execa("npm install", {
    cwd: getRootPath(),
    stdio: [2, 2, 2],
});
```

### 全局使用cli

在支持全局使用之前，需要修改一下模板文件中的文件引用路径，不然执行时会报错

根目录下新建bin文件夹，之前的文件（index, createIndexTemplate, createPackageTemplate, config, template, question）移到bin下, 修改package.json, 代码如下：

```json
{
  "name": "zyf-cli",
  "version": "1.0.0",
  "description": "基于nodejs的cli工具",
  "main": "index.js",
  "bin": "./bin/index.js",
  "type": "module",
  "scripts": {
    "test": "rm -rf ./demo && node index.js",
    "test-g": "rm -rf ./demo && zyf-cli"
  },
  "repository": {
    "type": "git",
    "url": "git@gitee.com:wendZzoo/zyf-cli.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ejs": "^3.1.8",
    "execa": "^6.1.0",
    "inquirer": "^9.0.2"
  }
}
```

上面可以看到新增了一条指令`test-g`, 需要先配置一下全局使用

修改一下createIndexTemplate.js 中文件路径的引用方式，修改代码如下：

```js
import ejs from "ejs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export default (config) => {
    const __dirname = fileURLToPath(import.meta.url);
    const indexTemplate = fs.readFileSync(
        path.resolve(__dirname, "../template/index.ejs")
    );
    const code = ejs.render(indexTemplate.toString(), {
        middleware: config.middleware,
    });
    return code;
};
```

因为package.json中配置了`"type": "module"`，原本node可以使用的`__dirname`只能借助`fileURLToPath`实现
相同的，createPackageTemplate一样的改造，代码重复就不贴了

配置全局使用, 终端执行`npm link`, `npm root -g` 打开输出的文件路径，全局下已经出现了zyf-cli

执行`yarn test-g`, 正常出现demo

### 代码格式化

使用prettier格式化demo下代码

prettier官方文档：

> <https://www.prettier.cn/docs/index.html>

`npm install prettier` 安装prettier

只需要在创建模板最终输出的时候，使用prettier进行代码格式化

改造createIndexTemplate的return, 代码如下：

```js
import prettier from "prettier";

return prettier.format(code, { parser: "babel" });
```

createPackageTemplate修改如下：

```js
import prettier from "prettier";

return prettier.format(code, { parser: "json" });
```

## 最后

至此，一个cli工具项目基本完成，基于此实现思路可以做很多平日里重复工作的优化
