const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const devConfig = {
  mode: "development",
  devServer: {
    host: "0.0.0.0", // in order to use dev server inside docker
    port: 8080,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
};

module.exports = merge(commonConfig, devConfig);
