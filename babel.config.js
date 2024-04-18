module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ["@babel/plugin-transform-class-properties", { loose: true }],
      ["@babel/plugin-transform-private-methods", { loose: true }],
      ["@babel/plugin-transform-private-property-in-object", { loose: true }],
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./"],
          extensions: [".js", ".jsx", ".es", ".es6", ".mjs", ".ts", ".tsx"],
          alias: {
            navigation: "./navigation",
            components: "./components",
            pages: "./pages",
            state: "./state",
            types: "./types",
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
