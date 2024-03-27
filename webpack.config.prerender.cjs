const path = require('path');
const webpack = require('webpack');
const Dotenv = require("dotenv-webpack");

/* Compression */
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

/* CSS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

/* Code Splitting */
const LoadablePlugin = require('@loadable/webpack-plugin');


/*  !! @TODO [serverConfig, clientConfig module 정의 구분]
    .css, module.css 등 asset 관련 rule은 clientConfig에만 필요하고 serverConfig에서 제외해도 될 것 같은데 serverConfig에서 제외할 경우 오류 발생함.
    이유 알 수 없음.
    우선 babelLoader 값을 clientConfig와 serverConfig에 동일하게 적용.
*/
const babelLoader = (devMode) => ({
  rules: [
    {
      test: /.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',
            ['@babel/preset-react', { 'runtime': 'automatic' }]]
        }
      }
    },
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      },
    },
    /*  webpack-contrib. Webpack Github Readme - css-loader Recommend. 
        ( https://github.com/webpack-contrib/css-loader#recommend ) 
    */
    {
      test: /\.css$/,
      exclude: /\.module\.css$/i, // 모듈 파일 제외 설정
      use: [
        /* Do not use style-loader and mini-css-extract-plugin together. ( https://github.com/webpack-contrib/css-loader#recommend ) */
        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
      ]
    },
    {
      test: /\.module\.css$/i,
      use: [
        /* Do not use style-loader and mini-css-extract-plugin together. ( https://github.com/webpack-contrib/css-loader#recommend ) */
        devMode ? "style-loader" : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
      ],
    },
  ]
});

const resolve = {
  extensions: ['.js', '.ts', '.tsx'],
  alias: {
    process: "process/browser"
  },
};

const prerendererConfig = (env, argv) => {
  const devMode = argv.mode === 'development';
  return ({
    target: 'node',
    entry: './src/prerender.jsx',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'prerender.cjs',
    },
    module: babelLoader(devMode),
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom$/,
      }),
    ].concat(
      devMode ? []
      : [
        new MiniCssExtractPlugin(),
        /* Compression 
          Compression Plugins should appear after file generating plugins. */
        new CompressionPlugin({
          test: /\.js$|\.css$|\.html$/,
        }),
        new BrotliPlugin({
          test: /\.js$|\.css$|\.html$/,
        }),
      ]),
    resolve
  })
};

module.exports = [ prerendererConfig ];