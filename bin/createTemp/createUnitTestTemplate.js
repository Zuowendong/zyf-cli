import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/unit-test.ejs", { middleware: config.middleware }, "babel");
};
