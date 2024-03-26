const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Ensure there's a resolve object
  if (!config.resolve) {
    config.resolve = {};
  }

  // Ensure there's a fallback object within resolve
  if (!config.resolve.fallback) {
    config.resolve.fallback = {};
  }

  // Add or replace fallbacks for Node core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    path: require.resolve("path-browserify"),
    https: require.resolve("https-browserify"),
    http: require.resolve("stream-http"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    // Add other polyfills as needed, common ones include:
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer/"),
    process: require.resolve("process/browser"),
    net: false, // Mocking net as it's not typically used in the browser
    tls: false, // Mocking tls for the same reason
    fs: false, // Mocking fs since it's not available in the browser
    // Add other necessary polyfills or false fallbacks here
  };

  // Return the customized config
  return config;
};
