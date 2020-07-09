const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
                    { loader: "style-loader" },
                    { loader: "css-loader" }
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
        // new WorkboxPlugin({
        //     globDirectory: './dist/',
        //     globPatterns: ['**/*.{html,js,css}'],
        //     swSrc: './src/service-worker.js',
        //     swDest: './dist/service-worker.js'
        // }),
        new WorkboxPlugin.GenerateSW({
            exclude: [/\.(?:png|jp(e*)g|svg|gif)$/],
            runtimeCaching: [{
                urlPattern: /\.(?:png|jp(e*)g|svg|gifZ)$/,
                handler: 'CacheFirst',
            }]
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        http2: true,
        disableHostCheck: true,
        compress: true,
        port: 9000
    }
}