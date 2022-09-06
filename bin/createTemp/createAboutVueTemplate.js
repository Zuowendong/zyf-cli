import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/about-vue.ejs", { middleware: config.middleware }, "html");
};
