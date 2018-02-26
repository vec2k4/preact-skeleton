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
                // Images: png, jpg, jpeg, gif
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                // File svg
                test: /^(?!.*\.inline\.svg$).*\.svg$/,
                use: [
                    "file-loader",
                    {
                        // https://github.com/rpominov/svgo-loader & https://github.com/svg/svgo
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeComments: true },
                                { removeTitle: true },
                                { mergePaths: true },
                                { convertPathData: true },
                                { removeViewBox: true },
                                { removeDimensions: true }
                            ]
                        }
                    }
                ]
            },
            {
                // Inline svg
                test: /\.inline.svg$/,
                use: [
                    // https://github.com/kossnocorp/desvg
                    "desvg-loader/preact", 
                    // https://github.com/dolbyzerr/svg-loader
                    "svg-loader",
                    {
                        // https://github.com/rpominov/svgo-loader & https://github.com/svg/svgo
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeComments: true },
                                { removeTitle: true },
                                { mergePaths: true },
                                { convertPathData: true },
                                { removeViewBox: true },
                                { removeDimensions: true },
                                { removeXMLNS: true },
                            ]
                        }
                    }
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