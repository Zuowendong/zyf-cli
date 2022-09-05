import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/todo-vue.ejs", { middleware: config.middleware }, "html");
};
