import { when, whenDev } from "@craco/craco";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack from "webpack";
import path from "path";

console.log(`Hello Config.\n\tNODE_ENV=${process.env.NODE_ENV}\n\tnpm_config_SSR=${process.env.npm_config_SSR}`)
const DIST_PATH = path.resolve(__dirname, './dist')
console.log(`DIST_PATH=${DIST_PATH}`);

/* Dilan Nair. CRACO docs - configuration - Configuration Tips.
( https://craco.js.org/docs/configuration/getting-started/#configuration-tips ) */
module.exports = {
    webpack: {
        plugins: {
            remove: [
            ],
            add: [
                new LoadablePlugin(),
                // whenDev(
                //     () => [],
                //     (process.env.npm_config_REPORT_NAME !== undefined)
                //         ? [new BundleAnalyzerPlugin({
                //             analyzerMode: 'static',
                //             reportFilename: `../report/${process.env.npm_config_REPORT_NAME}/bundle_analysis.html`
                //         })]
                //         : []
                // )
            ]
        },
        configure: (webpackConfig, { env, paths }) => {

            if (process.env.npm_config_SSR === 'true') {
                // webpackConfig.mode = process.env.NODE_ENV
                // webpackConfig.entry = when( process.env.npm_config_SSR === 'true', () => path.resolve(__dirname, './src/client/main-web.tsx'), webpackConfig.entry )
                webpackConfig.target = 'web'
                webpackConfig.entry = './src/client/main-web.tsx'
                webpackConfig.output = {
                    filename: whenDev(() => '[name].js', '[name]-bundle-[chunkhash:8].js'),
                    path: path.join(DIST_PATH, 'web'),
                    /**
                     * In the client app we use `__webpack_public_path__` to set `publicPath`
                     * during runtime. We are not required to set it here actually. On the
                     * server we set it with the `ChunkExtractor`.
                     *
                     * Read more about an environment based publich-path here:
                     * @see https://webpack.js.org/guides/public-path/
                     */
                    publicPath: '/static/',
                }
            }

            // webpackConfig.entry = whenDev(()=> path.resolve(__dirname, './src/client/main-web.tsx'), webpackConfig.entry )
            webpackConfig.module.rules = webpackConfig.module.rules.concat([
                /* Tree-shaking on Swiper.js modules. ( https://stackoverflow.com/questions/71031894/why-isnt-webpack-tree-shaking-swiperjs-modules ) */
                {
                    test: /\.(mjs)$/,
                    include: [
                        path.resolve(__dirname, 'node_modules/swiper/modules')
                    ],
                    sideEffects: false
                }
            ])
            webpackConfig.optimization = whenDev(() => ({}), webpackConfig.optimization)
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
    babel: {
        plugins: [
            '@loadable/babel-plugin'
            /* ! Not Required
                Material UI - Guides - Minimizing Bundle Size
            ( https://mui.com/material-ui/guides/minimizing-bundle-size/#option-two-use-a-babel-plugin ) */
            // [
            //   'babel-plugin-import',
            //   {
            //     libraryName: '@mui/material',
            //     libraryDirectory: '',
            //     camel2DashComponentName: false,
            //   },
            //   'core',
            // ],
            // [
            //   'babel-plugin-import',
            //   {
            //     libraryName: '@mui/icons-material',
            //     libraryDirectory: '',
            //     camel2DashComponentName: false,
            //   },
            //   'icons',
            // ],
        ],
    }
};