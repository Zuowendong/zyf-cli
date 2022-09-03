export default () => {
	return {
		type: "checkbox",
		name: "middleware",
		message: "select the dependencies you want to install",
		choices: [{ name: "vitest" }, { name: "scss" }, { name: "vue-router" }],
	};
};
