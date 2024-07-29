/***************************************************************************************
*    Title: Server Side Rendering React with Express
*    Author: WittCode
*    Date: 2023, Nov. 14.
*    Availability: https://wittcode.com/blogs/server-side-rendering-react-with-express
*
*    Title: A Complete Guide to Server-Side Rendering (SSR) with React.js
*    Author: Mehul Mohan
*    Date: 2023, Mar. 20.
*    Availability: https://codedamn.com/news/reactjs/server-side-rendering-reactjs
*
*    Title: webpack-typescript-개발환경-설정하기
*    Author: SSH
*    Date: 2021, May. 3.
*    Availability: https://velog.io/@ssh1997/webpack-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
*
*    Title: css-loader Recommend ( Github )
*    Author: webpack-contrib
*    Availability: https://github.com/webpack-contrib/css-loader#recommend
*
*    Title: Webpack 러닝 가이드 = CSS 스타일 구성
*    Author: 이듬(E.UID)
*    Availability: https://yamoo9.gitbook.io/webpack/react/create-your-own-react-app/configure-css
***************************************************************************************/
/**
 * inspired by:
 * @see https://github.com/gregberge/loadable-components/blob/8d29fef8f02e5b0cdd4a1add3399e48089a7b97a/examples/server-side-rendering/webpack.config.babel.js
 */

const path = require('path');
// const webpack = require('webpack');
// const nodeExternals = require('webpack-node-externals');
// const copyPlugin = require("copy-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin');
// const InterpolateHtmlPlugin = require('interpolate-html-plugin');
// const Dotenv = require("dotenv-webpack");

const {
  createLoadableComponentsTransformer,
} = require('typescript-loadable-components-plugin')

/* Compression */
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

/* CSS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

/* Code Splitting */
const LoadablePlugin = require('@loadable/webpack-plugin');
const { Minimize } = require('@mui/icons-material');

/* Debug */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

// const { loadableTransformer } = require('loadable-ts-transformer');

const DIST_PATH = path.resolve(__dirname, './dist');
console.log(`DIST_PATH:${DIST_PATH}`);

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = (target) => ({
  name: target,
  mode: isDev ? 'development' : 'production',
  // include source maps only in dev mode (https://webpack.js.org/configuration/devtool/)
  // devtool: isDev ? 'cheap-module-source-map' : undefined,
  target: target,
  resolve: {
    extensions: ['.ts', '.tsx', '.js' ],
  },
  entry: path.resolve(__dirname, './src/main-' + target + '.tsx'),
  output: {
    filename: '[name].bundle.js',
    // chunkFilename: '[name].[chunkhash].js',
    path: path.join(__dirname, '/dist', `/${target}`),
    /**
     * In the client app we use `__webpack_public_path__` to set `publicPath`
     * during runtime. We are not required to set it here actually. On the
     * server we set it with the `ChunkExtractor`.
     *
     * Read more about an environment based publich-path here:
     * @see https://webpack.js.org/guides/public-path/
     */
    // publicPath: `static/${target}`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use:
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
              ['@babel/preset-react', { 'runtime': 'automatic' }]],
            plugins: [
              [
                'babel-plugin-import',
                {
                  libraryName: '@mui/material',
                  libraryDirectory: '',
                  camel2DashComponentName: false,
                },
                'core',
              ],
              [
                'babel-plugin-import',
                {
                  libraryName: '@mui/icons-material',
                  libraryDirectory: '',
                  camel2DashComponentName: false,
                },
                'icons',
              ],
            ]
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [          
          {
            loader: 'babel-loader',
            options: {
              // caller is used in babel-config for further optimisations
              caller: { target },
            },
          },
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              getCustomTransformers: (program) => ({
                before: [createLoadableComponentsTransformer(program, {})],
              }),
            },
          },
        ],
      },
      /*  webpack-contrib. Webpack Github Readme - css-loader Recommend. 
          ( https://github.com/webpack-contrib/css-loader#recommend ) 
      */
      {
        test: /\.css$/,
        exclude: /\.module\.css$/i, // 모듈 파일 제외 설정
        use: [
          /* Do not use style-loader and mini-css-extract-plugin together. ( https://github.com/webpack-contrib/css-loader#recommend ) */
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ]
      },
      {
        test: /\.module\.css$/i,
        use: [
          /* Do not use style-loader and mini-css-extract-plugin together. ( https://github.com/webpack-contrib/css-loader#recommend ) */
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
      /* Tree-shaking on Swiper.js modules. ( https://stackoverflow.com/questions/71031894/why-isnt-webpack-tree-shaking-swiperjs-modules ) */
      // {
      //   test: /\.(mjs)$/,
      //   include: [
      //     path.resolve(__dirname, 'node_modules/swiper/modules')
      //   ],
      //   sideEffects: false
      // }
    ],
  },
  plugins: [
    new LoadablePlugin(),
    new CleanWebpackPlugin({
      /**
       * during rebuilds (watch mode) we do not clean old files
       * @see https://github.com/johnagan/clean-webpack-plugin/issues/152#issuecomment-509028712
       */
      cleanStaleWebpackAssets: false,
    }),
  ],
  // experiments: {
  //   outputModule: true,
  // },
  // ...isDev ? {
  //   optimization: {
  //     // chunkIds: 'named',
  //     // moduleIds: 'named',
  //     // mangleExports: false,
  //     // mangleWasmImports: false,
  //     // innerGraph: true,
  //     // minimize: false,
  //     // providedExports: true,
  //     // usedExports: true,
  //     // sideEffects: false,
  //   }
  // } : {},
});
