export function createConfig(answer) {
	function haveMiddleware(name) {
		return answer.middleware.indexOf(name) !== -1;
	}

	return {
		packageName: answer.packageName,
		middleware: {
			vitest: haveMiddleware("vitest"),
		},
	};
}
