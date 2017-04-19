var path = require("path");

var config = {
  entry: [path.join(__dirname,"src/index.js")],
  output: {
    path: path.join(__dirname,"build"),
    publicPath: "/build/",
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".js"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  devServer: {
    inline: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: /src/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        include: /src/,
        loader: 'babel-loader'
      },
    ]
  }
}

module.exports = config;
