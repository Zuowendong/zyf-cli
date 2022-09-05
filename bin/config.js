export function createConfig(answer) {
	function haveMiddleware(name) {
		console.log("config.js", answer.middleware);

		return answer.middleware.indexOf(name) !== -1;
	}

	return {
		packageName: answer.packageName,
		middleware: {
			vitest: haveMiddleware("vitest"),
			scss: haveMiddleware("scss"),
			vueRouter: haveMiddleware("vue-router"),
			pinia: haveMiddleware("pinia"),
		},
	};
}
