const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const os = require("os");

var hostname = os.hostname();
var port = 8080;

module.exports = merge(common, {
    devtool: "source-map",
    devServer: {
        contentBase: "./dist",
        compress: true,
        inline: true,
        host: "0.0.0.0",                // Make app available from external browsers...
        port: port,                     // ...on the assigned port...
        public: `${hostname}:${port}`,  // ...with the specified URL...
        disableHostCheck: true          // ...and do not check hosts
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ]
});