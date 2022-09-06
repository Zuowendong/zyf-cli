import inquirer from "inquirer";

import packageName from "./packageName.js";
import middleware from "./middleware.js";
import install from './install.js'

export default () => {
    return inquirer.prompt([
        packageName(),
        middleware(),
        install()
    ]);
}
