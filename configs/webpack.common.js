const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const APP_STRUCTURE = {
  src: path.resolve(__dirname, "../src"),
  dist: path.resolve(__dirname, "../dist"),
};

module.exports = {
  entry: path.join(APP_STRUCTURE.src, "App.tsx"),
  output: {
    path: APP_STRUCTURE.src,
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "react-native": "react-native-web",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx|json)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(APP_STRUCTURE.src, "index.html"),
    }),
  ],
};
