
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.config')('web')

const copyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require("dotenv-webpack");

/* Compression */
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

/* CSS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Debug */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = merge(baseConfig, {
    plugins: [
        ...baseConfig.plugins,
        new Dotenv(),
        new HtmlWebpackPlugin({
            template: `${__dirname}/public/ssr_template.html`,
            favicon: `${__dirname}/public/favicon.ico`,
            scriptLoading: 'module',
            inject: "body",
            minify: false,
            // minify: devMode ? false : {
            //   collapseWhitespace: true,
            //   keepClosingSlash: true,
            //   removeComments: true,
            //   /* !!! */
            //   removeRedundantAttributes: false,
            //   removeScriptTypeAttributes: true,
            //   removeStyleLinkTypeAttributes: true,
            //   useShortDoctype: true
            // }
        }),
        // new HtmlWebpackInjectAttributesPlugin(),
        /* Copy Project's public static contents( public/ : images, manifest.json, robots.txt ) to dist/  */
        new copyPlugin({
            patterns: [
                {
                    from: "robots.txt", to: "robots.txt"
                },
                {
                    from: "public/manifest.json", to: "manifest.json"
                },
                // {
                //   from: "public/images", to: "images"
                // }
            ]
        }),
    ].concat(
        isDev
            ? [
                // new MiniCssExtractPlugin(),
                new BundleAnalyzerPlugin({ analyzerMode: 'static' })
            ]
            :
            [
                /* Demián Renzulli. (2019-02-17). Defer non-critical CSS. web.dev.   
                  ( https://web.dev/articles/defer-non-critical-css ) */
                /* MiniCssExtractPlugin
                  ( https://webpack.js.org/plugins/mini-css-extract-plugin/ ) */
                new MiniCssExtractPlugin({
                    attributes: {
                        rel: "preload",
                        as: "style",
                        onload: "this.onload=null;this.rel='stylesheet'",
                    },
                }),
                // new HtmlCriticalPlugin({
                //   base: path.join(path.resolve(__dirname), 'dist/'),
                //   src: 'index.html',
                //   dest: 'index.html',
                //   inline: true,
                //   minify: true,
                //   extract: true,
                //   // width: 375,
                //   // height: 565,
                //   penthouse: {
                //     blockJSRequests: false,
                //   }
                // }),    
                /* Compression 
                  Compression Plugins should appear after file generating plugins. */
                new CompressionPlugin({
                    test: /\.js$|\.css$|\.html$/,
                }),
                new BrotliPlugin({
                    test: /\.js$|\.css$|\.html$/,
                }),
            ]
    ),
})