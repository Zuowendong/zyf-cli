import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/pinia-js.ejs", { middleware: config.middleware }, "babel");
};
