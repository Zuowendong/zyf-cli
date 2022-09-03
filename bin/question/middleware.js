export default () => {
    return {
        type: "checkbox",
        name: "middleware",
        choices: [
            { name: "vitest" },
            { name: "scss" }
        ],
    };
};
