const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var path = require("path");

module.exports = {
  mode: "production",
  entry: {
    indexing: "./indexing/k6-test.js",
    search: "./search/k6-test.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        // by default, it resolves `node_modules`
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", { targets: "defaults" }]],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  plugins: [new CleanWebpackPlugin()],
  externals: /^(k6|https?\:\/\/)(\/.*)?/,
};
