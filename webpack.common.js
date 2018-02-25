// https://webpack.js.org/guides/

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

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
        new HtmlWebpackPlugin({
            title: "TestApplication"
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
                    "css-loader"
                ]
            },
            {
                // Images: png, jpg, gif and svg
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    "file-loader"
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