const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'img/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/match.html",
            filename: "match.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/league.html",
            filename: "league.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/favorite.html",
            filename: "favorite.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/components/navbar/navbar.html",
            filename: "navbar.html"
        }),
        new ServiceWorkerWebpackPlugin({
            entry: path.join(__dirname, './src/sw.js'),
          }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        http2: true,
        disableHostCheck: true,
        compress: true,
        port: 9000
      }
}