/**
 * inspired by:
 * @see https://github.com/gregberge/loadable-components/blob/8d29fef8f02e5b0cdd4a1add3399e48089a7b97a/examples/server-side-rendering/webpack.config.babel.js
 */
const path = require('path')

const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')

const {
  createLoadableComponentsTransformer,
} = require('typescript-loadable-components-plugin')

/* Compression */
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

/* CSS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Debug */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const DIST_PATH = path.resolve(__dirname, './dist')

const production = process.env.NODE_ENV === 'production'
const isDev =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = (target) => ({
  name: target,
  mode: isDev ? 'development' : 'production',
  // include source maps only in dev mode (https://webpack.js.org/configuration/devtool/)
  // devtool: isDev ? 'cheap-module-source-map' : undefined,
  target: target,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  entry: path.resolve(__dirname, './src/main-' + target + '.tsx'),
  output: {
    filename: production ? '[name]-bundle-[chunkhash:8].js' : '[name].js',
    chunkFilename: '[name]-bundle-[chunkhash:8].js',
    path: path.join(DIST_PATH, target),
    /**
     * In the client app we use `__webpack_public_path__` to set `publicPath`
     * during runtime. We are not required to set it here actually. On the
     * server we set it with the `ChunkExtractor`.
     *
     * Read more about an environment based publich-path here:
     * @see https://webpack.js.org/guides/public-path/
     */
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.(ts)x?$/,
        exclude: /(node_modules|others)/,
        use: [
          /**
           * babel-loader and ts-loader are used together, which requires us to
           * set `module` to `esnext` in our tsconfig.json. If we don't
           * loadable-components will not work.
           *
           * @see https://github.com/gregberge/loadable-components/issues/173#issuecomment-459915787
           */
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
      {
        test: /\.css$/,
        exclude: /\.module\.css$/i, // 모듈 파일 제외 설정
        use: [
          /* Do not use style-loader and mini-css-extract-plugin together. ( https://github.com/webpack-contrib/css-loader#recommend ) */
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          // "style-loader",
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
          // "style-loader",
          // MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
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
    })
    // new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
  ].concat(
    isDev
      ? [
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
  // watchOptions: {
  //   aggregateTimeout: 1000,
  //   poll: (process.platform === 'linux' && 1000) || false, // make --watch work on linux
  //   ignored: ['node_modules', 'dist', 'lib'],
  // },
})
