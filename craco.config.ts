import { when, whenDev, whenProd } from "@craco/craco";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import webpack, { DefinePlugin } from "webpack";
import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import BrotliPlugin from "brotli-webpack-plugin";
import CompressionPlugin from "compression-webpack-plugin";
import nodeExternals from "webpack-node-externals";

const isSsr = process.env.npm_config_SSR === 'true'
const isTargetWeb = process.env.npm_config_TARGET === 'web';

console.log(`Hello Config. \
    \n\tNODE_ENV=${process.env.NODE_ENV} \
    \n\tnpm_config_SSR=${process.env.npm_config_SSR} \ 
    \n\tnpm_config_TARGET=${process.env.npm_config_TARGET} \
    \n\tisSsr=${isSsr} \
    \n\tisTargetWeb=${isTargetWeb} \
`)

const DIST_PATH = path.resolve(__dirname, './dist')

console.log(`DIST_PATH=${DIST_PATH}`);

/* Dilan Nair. CRACO docs - configuration - Configuration Tips.
( https://craco.js.org/docs/configuration/getting-started/#configuration-tips ) */
module.exports = {
    // paths: {
    //     appHtml: "public/index_unoptimized.html"
    // },
    webpack: {
        plugins: {
            remove: [
                (!(isTargetWeb)) && new HtmlWebpackPlugin()
            ],
            add: [
                [new CopyPlugin({ patterns: [
                    { from: 'public/images', to: 'images/' },
                    { from: 'public/robots.txt', to: 'robots.txt' },
                    { from: 'public/favicon.ico', to: 'favicon.ico' },
                    { from: 'public/manifest.json', to: 'manifest.json' },
                ] }), 'append'],
                [new LoadablePlugin(), 'append'],
                [new CleanWebpackPlugin({
                    /**
                     * during rebuilds (watch mode) we do not clean old files
                     * @see https://github.com/johnagan/clean-webpack-plugin/issues/152#issuecomment-509028712
                     */
                    cleanStaleWebpackAssets: false,
                }), 'append'],
                ...when(isSsr, () =>
                    [
                        new DefinePlugin({
                            'process.env.REACT_APP_PUBLIC_URL': '/static/',
                        }),
                        ...when(isTargetWeb, () =>
                            whenProd(() => [
                                [
                                    new CompressionPlugin({
                                        test: /\.js$|\.css$|\.html$/,
                                    })
                                    , 'append'
                                ],
                                [
                                    new BrotliPlugin({
                                        test: /\.js$|\.css$|\.html$/,
                                    })
                                    , 'append'
                                ],
                            ], []) as any[]
                        , []) as any[]
                    ], []) as any[] ,
                ...((process.env.npm_config_REPORT_NAME !== undefined)
                    ? whenProd(() => (
                        [[new BundleAnalyzerPlugin({
                            analyzerMode: 'static',
                            reportFilename: `../report/${process.env.npm_config_REPORT_NAME}/bundle_analysis.html`
                        }), 'append']]
                    ), []) as any[] : [])
            ]
        },
        configure: (webpackConfig, { env, paths }) => {

            if (isSsr) {
                webpackConfig.target = process.env.npm_config_TARGET
                webpackConfig.entry = `./src/ssr/main-${process.env.npm_config_TARGET}.tsx`
                webpackConfig.output = {
                    filename: whenDev(() => '[name].js', '[name]-bundle-[chunkhash:8].js'),
                    path: path.join(DIST_PATH, (isTargetWeb) ? 'js' : 'node'),
                    /**
                     * In the client app we use `__webpack_public_path__` to set `publicPath`
                     * during runtime. We are not required to set it here actually. On the
                     * server we set it with the `ChunkExtractor`.
                     *
                     * Read more about an environment based publich-path here:
                     * @see https://webpack.js.org/guides/public-path/
                     */
                    publicPath: `/static/${(isTargetWeb) ? 'js/' : ''}`,
                    ...(!isTargetWeb) ?
                        {
                            libraryTarget: 'commonjs2',
                        }
                        : {}

                }
                // webpackConfig.externals = [nodeExternals(), ... (!isTargetWeb) ? ['@loadable/component'] : []]
                webpackConfig.externals = when(!isTargetWeb, () => [nodeExternals(), '@loadable/component'], webpackConfig.externals ) 
                if (isTargetWeb) {
                    const htmlWebpackPluginInstance = webpackConfig.plugins.find(
                        plugin => plugin instanceof HtmlWebpackPlugin
                    );
                    if (htmlWebpackPluginInstance) {
                        htmlWebpackPluginInstance.options.template = path.resolve(__dirname, './public/index-node.html');
                        htmlWebpackPluginInstance.options.filename = '../index.html';
                        htmlWebpackPluginInstance.options.inject = false
                    }
                }
                if (!isTargetWeb) {
                    webpackConfig.node = {
                        __dirname: false,
                        __filename: false,
                    }
                }
            }
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
            /** 
             * https://velog.io/@eenaree/eslint-tsconfig-paths
            */
            webpackConfig.resolve.extensions = [ '.ts', '.tsx', ...webpackConfig.resolve.extensions ]
            webpackConfig.resolve.alias = { "~" : path.join(__dirname, 'src'), ...webpackConfig.resolve.alias }
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