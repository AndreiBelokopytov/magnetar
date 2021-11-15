const { merge } = require("webpack-merge");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const produdction = require("./webpack.prod");

module.exports = merge(produdction, {
  plugins: [new BundleAnalyzerPlugin()],
});
