import createTemplate from "../utils/createTemplate.js";

export default (config) => {
	return createTemplate("../../template/vite-config-js.ejs", {}, "babel");
};
