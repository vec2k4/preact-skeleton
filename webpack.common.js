// https://webpack.js.org/guides/

const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        app: [
            "./project/src/app.tsx", // Application bootstrapping
        ]
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(["dist"]),

        // https://github.com/jantimon/html-webpack-plugin
        new HtmlWebpackPlugin({
            title: "TestApplication",
            template: "./project/index.template.html",
            filename: "index.html"
        })
    ],
    resolve: {
        // Add ".ts" and ".tsx" as resolvable extensions.
        extensions: [
            ".ts",
            ".tsx",
            ".js"
        ]
    },
    module: {
        rules: [
            {
                // Bootstrap native
                test: /bootstrap\.native/,
                use: {
                    loader: 'bootstrap.native-loader'
                }
            },
            {
                // Typescript: tsx
                test: /\.tsx?$/,
                use: [
                    "ts-loader",
                    "ts-nameof-loader"
                ],
                exclude: /node_modules/
            },
            {
                // Styles: css
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                // Styles: sass
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                // Images: png, jpg, gif, svg
                test: /\.jpe?g$|\.gif$|\.png$|^(?!.*\.inline\.svg$).*\.svg$/,
                use: [
                    "file-loader"
                ]
            },
            {
                // Inline svg
                test: /\.inline.svg$/,
                use: [
                    // https://github.com/kossnocorp/desvg
                    "desvg-loader/preact", 
                    // https://github.com/dolbyzerr/svg-loader
                    "svg-loader"
                ]
            },
            {
                // Fonts: woff, woff2, eot, ttf, otf
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    "file-loader"
                ]
            }
        ]
    },
};