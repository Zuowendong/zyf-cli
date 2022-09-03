import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate(
		"../../template/app-vue.ejs",
		{
			middleware: config.middleware,
		},
		"html"
	);
};
