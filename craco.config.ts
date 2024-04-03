import { whenDev } from "@craco/craco";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";
import path from "path";

/* Dilan Nair. CRACO docs - configuration - Configuration Tips.
( https://craco.js.org/docs/configuration/getting-started/#configuration-tips ) */
module.exports = {
    webpack: {
        plugins: {
            remove: [
            ],
            add: [
                new LoadablePlugin(),
                // new webpack.optimize.LimitChunkCountPlugin({
                //     maxChunks: 1,
                // }),
                whenDev(
                    ()=>([ new BundleAnalyzerPlugin({ 
                        analyzerMode: 'static',
                        reportFilename: `../report/${process.env.npm_config_REPORT_NAME}/bundle_analysis.html`
                    }) ]), 
                    [ new BundleAnalyzerPlugin({ 
                        analyzerMode: 'static',
                        reportFilename: `../report/${process.env.npm_config_REPORT_NAME}/bundle_analysis.html`
                    }) ]
                )
            ]
        },
        configure: (webpackConfig, { env, paths }) => {
            // webpackConfig.module.rules = webpackConfig.module.rules.concat([
            //     /* Tree-shaking on Swiper.js modules. ( https://stackoverflow.com/questions/71031894/why-isnt-webpack-tree-shaking-swiperjs-modules ) */
            //     {
            //       test: /\.(mjs)$/,
            //       include: [
            //         path.resolve(__dirname, 'node_modules/swiper/modules')
            //       ],
            //       sideEffects: false
            //     }
            // ])            
            // webpackConfig.publicPath = ''
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