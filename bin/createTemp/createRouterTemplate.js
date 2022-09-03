import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/router.ejs", { middleware: config.middleware }, "babel");
};
