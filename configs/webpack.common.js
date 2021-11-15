const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");

const APP_STRUCTURE = {
  src: path.resolve(__dirname, "../src"),
  dist: path.resolve(__dirname, "../dist"),
};

module.exports = {
  entry: path.join(APP_STRUCTURE.src, "App.tsx"),
  output: {
    path: APP_STRUCTURE.dist,
    filename: "[name].bundle.js",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "react-native": "react-native-web",
      "@improbable-eng/grpc-web-node-http-transport": "@improbable-eng/grpc-web",
    },
    plugins: [new TsconfigPathsPlugin()],
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

      {
        test: /\.(png|jpeg|jpg|gif)/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(APP_STRUCTURE.src, "index.html"),
    }),
  ],
};
