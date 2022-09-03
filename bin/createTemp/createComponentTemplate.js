import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate(
		"../../template/component.ejs",
		{
			middleware: config.middleware,
		},
		"html"
	);
};
