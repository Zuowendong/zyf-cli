import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate(
		"../../template/index-html.ejs",
		{
			htmlTag: "<!DOCTYPE html>",
		},
		"html"
	);
};
