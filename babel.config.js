module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "@babel/plugin-proposal-export-namespace-from",
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".js", ".jsx", ".es", ".es6", ".mjs", ".ts", ".tsx"],
          alias: {
            navigation: "./navigation",
            components: "./components",
            screens: "./screens",
            state: "./state",
          },
        },
      ],
    ],
    overrides: [
      {
        test: (fileName) => !fileName.includes("node_modules"),
        plugins: [
          [
            require("@babel/plugin-proposal-class-properties"),
            { loose: false },
          ],
        ],
      },
    ],
  };
};
