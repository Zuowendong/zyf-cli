import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate(
		"../../template/package.ejs",
		{
			packageName: config.packageName,
			middleware: config.middleware,
		},
		"json"
	);
};
