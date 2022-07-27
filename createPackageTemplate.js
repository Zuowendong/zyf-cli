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
