"use strict";

const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');

let plugins = [ new HtmlWebpackPlugin({
        template: "./src/html/template.html",
        filename: "index.html",
        hash: true
    })
]

let webpack_mode = process.argv.indexOf("--optimization-minimize") > -1 ? "production" : "development"

module.exports = [{
    mode: `${webpack_mode}`,
    //target: ["node14"],
    plugins: plugins,
    watchOptions: {
        poll: 500,
        aggregateTimeout: 400,
    },
    entry: {
        app: [ "./src/config/globals.js", "./src/config/polyfills.js", "./src/jsx/Entry.jsx"]
    },
    output: {
        path: path.resolve(__dirname, "../../pub"),
        publicPath: "",
        filename: "[name].bundle.js"
        //assetModuleFilename: "assets/[name][ext][query]"
    },
    module: {
        //unsafeCache: true,
        rules: [
            {test: /\.(svg|png|jpe?g)/, type: "asset", generator: {filename: "assets/images/[name][ext][query]"}},
            {test: /\.less/, use: ["style-loader", "css-loader", "less-loader"] },
            {test: /\.json/, use: ["json-loader"] },
            {test: /\.jsx/, use: {loader: "babel-loader",  options: {presets: ["@babel/preset-react"], plugins: ["react-hot-loader/babel"] }}},
            {test: /\.js/, use: {loader: "babel-loader", options: {presets: ["@babel/preset-react"] }}},
        ]
    },
    // Runs hot reloading server when using `webpack serve`
    devServer: {
        host: "0.0.0.0",
        port: "5055",
        hot: true,
        setupExitSignals: true,
        proxy: { "/": 'http://localhost' },
        // Uncomment to reload page on changes to server/
        //watchFiles: {
        //    paths: ["server"],
        //    options: { ignored: ["server/bin", "server/output", "server/static", "server/.*"] }
        //}
    },
}]
