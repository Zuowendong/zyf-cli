import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/main-js.ejs", { middleware: config.middleware }, "babel");
};
