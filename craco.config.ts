import { whenDev } from "@craco/craco";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";

/* Dilan Nair. CRACO docs - configuration - Configuration Tips.
( https://craco.js.org/docs/configuration/getting-started/#configuration-tips ) */
module.exports = {
    webpack: {
        // plugins: {
        //     add: [
        //         new CopyPlugin({
        //             patterns: [
        //                 { from: "robots.txt", to: "robots.txt"},
        //                 { from: "public/manifest.json", to: "manifest.json"},
        //                 { from: "public/images", to: "images"}
        //             ]
        //         })
        //     ],
        // },
        configure: (webpackConfig, { env, paths }) => {
            // const copyPluginInstance = webpackConfig.plugins.find(
            //     webpackPlugin => webpackPlugin instanceof CopyPlugin
            // );
            // if (copyPluginInstance) {
            //     copyPluginInstance.options.patterns = [
            //         { from: "robots.txt", to: "robots.txt" },
            //         { from: "public/manifest.json", to: "manifest.json" },
            //         { from: "public/images", to: "images" }
            //     ]
            // }
            // webpackConfig.module.rules = [
            //     {
            //         test: /\.(ts|tsx)$/,
            //         exclude: /(node_modules|others|ssr)/,
            //         use: [
            //             'babel-loader',
            //             {
            //                 loader: 'ts-loader',
            //                 options: {
            //                     onlyCompileBundledFiles: true,
            //                 },
            //             }
            //         ]
            //     },
            //     {
            //         test: /\.css$/,
            //         exclude: /\.module\.css$/i, // 모듈 파일 제외 설정
            //         use: [
            //             whenDev(() => "style-loader", MiniCssExtractPlugin.loader), // Do not use style-loader and mini-css-extract-plugin together. ( https://github.com/webpack-contrib/css-loader#recommend )
            //             "css-loader",
            //             "postcss-loader",
            //         ]
            //     },
            //     {
            //         test: /\.module\.css$/i,
            //         use: [
            //             whenDev(() => "style-loader", MiniCssExtractPlugin.loader), // Do not use style-loader and mini-css-extract-plugin together. ( https://github.com/webpack-contrib/css-loader#recommend )
            //             "css-loader",
            //             "postcss-loader",
            //         ],
            //     },
            // ]
            return webpackConfig;
        },
    },
};