export default () => {
	return {
		type: "input",
		name: "install",
		default() {
			return "Y";
		},
		message: "auto install dependencies",
	};
};
