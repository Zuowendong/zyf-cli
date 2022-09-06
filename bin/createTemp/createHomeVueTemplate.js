import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/home-vue.ejs", { middleware: config.middleware }, "html");
};
