var path = require("path");

var config = {
    entry: path.join(__dirname,"src/index.js"),
    output: {
        path: path.join(__dirname,"build"),
        publicPath: "/build/",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    devServer: {
        inline: true,
        port: 8080,
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            }
        ]
    }
}

module.exports = config;
