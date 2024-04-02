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

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const copyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const Dotenv = require("dotenv-webpack");

/* Compression */
const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

/* CSS */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");

/* Code Splitting */
const LoadablePlugin = require('@loadable/webpack-plugin');
const { createLoadableComponentsTransformer, } = require('typescript-loadable-components-plugin')

const { Minimize } = require('@mui/icons-material');


/* Debug */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/*  !! @TODO [serverConfig, clientConfig module 정의 구분]
    .css, module.css 등 asset 관련 rule은 clientConfig에만 필요하고 serverConfig에서 제외해도 될 것 같은데 serverConfig에서 제외할 경우 오류 발생함.
    이유 알 수 없음.
    우선 babelLoader 값을 clientConfig와 serverConfig에 동일하게 적용.
*/
const babelLoader = (isDev) => ({
  rules: [
    {
      test: /.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: [
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
      },      
      {
        loader: 'ts-loader',
        // options: {
        //   getCustomTransformers: (program) => ({
        //     before: [createLoadableComponentsTransformer(program, {})],
        //   }),
        // },
      },
    ]
    },
    // {
    //   test: /\.(ts|tsx)$/,
    //   exclude: /node_modules/,
    //   use: {
    //     loader: 'ts-loader',
    //   },
    // },
    /*  src/public/ 경로의 자원은 로드하지 않음. copyPlugin 을 통해 dist/ 로 복사함. */
    /*  @TODO [추후에 image를 번들로 build 및 import 할 경우]  
        네트워크 성능 vs. 번들 사이즈 tradeoff 조정 위해  inline / resource 로드를 선택할 기준 파일 크기를 설정할 수 있음. 
        상민. 2022, 7.20. [Webpack5] loader와 asset modules.
        ( https://velog.io/@tkdals0978/Webpack5-loader ) 
     */
    // {
    //   test: /\.(png|jpg|webp|svg|jpeg|gif|)$/,
    //   type: "asset",
    // },
    /*  Wepback.js. Webpack - Guides - Asset Management - Loading Fonts
        ( https://webpack.js.org/guides/asset-management/#loading-fonts )

        Wepback.js. Webpack - Configuration - Output - output.assetModuleFilename
        ( https://webpack.js.org/configuration/output/#outputassetmodulefilename )

        [assetModuleFilename 사용 시 폰트 중복 생성 이슈] 
        폰트 확장자 로드를 위해 rule 생성 + output.assetModuleFilename 을 사용할 경우 dist/ 에 폰트 파일이 중복 생성됨.
        rule을 통해 default filename 설정으로 한 번, 그리고 모든 asset 에 전역으로 적용되는 output.assetModuleFilename 설정으로 다시 한 번 파일명이 생성되는 것으로 추정됨.
        >> 전역 output.assetModuleFilename 를 사용하지 않고, 폰트 확장자에 대한 rule object 내에서 generator 를 통해 파일 경로 및 이름을 설정함.
        
        Harry Finn. (2021, Sep 3). Webpack 5: file-loader generates a copy of fonts with hash-name.
        ( https://stackoverflow.com/a/69041786 )
    */
    // {
    //   test: /\.(ttf|woff2)$/i,
    //   type: 'asset/resource',
    //   generator: {
    //     filename: (pathData) => {
    //       const filepath = path
    //         .dirname(pathData.filename)
    //         .split("/")
    //         .slice(1)
    //         .join("/");
    //       return `${filepath}/[name].[hash][ext][query]`;
    //     },
    //   },
    // },
  ]
});

const resolve = {
  extensions: ['.js', '.jsx', '.ts', '.tsx'],
  alias: {
    process: "process/browser"
  },
};

module.exports = (target) => ({
  name: target,
})

/* Wepback.js. Webpack - Configuration - Output - output.assetModuleFilename
  ( https://webpack.kr/configuration/mode/ ) */
const serverConfig = (env, argv) => {
  const isDev = argv.mode === 'development';
  return ({
    target: 'node',
    entry: {
      index: './src/server/index.jsx'
    },
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'server.cjs',
    },
    module: babelLoader(isDev),
    plugins: [
      new webpack.EnvironmentPlugin({
        PORT: 3001
      }),
      new Dotenv(),
      new LoadablePlugin(),
    ].concat(
      isDev ? [new MiniCssExtractPlugin()]
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

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = (target) => ({
  name: target,
  mode: isDev ? 'development' : 'production',
  target: ['web', 'es2017'],
  entry: path.resolve(__dirname, './src/index-' + target + '.tsx'),
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: 'static/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: babelLoader(isDev),
  plugins: [
    /* .env variables */
    // /*  !! @TODO [env variable Security Issue]
    //     ( https://stackoverflow.com/questions/41359504/webpack-bundle-js-uncaught-referenceerror-process-is-not-defined )
    // */
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/ssr_template.html`,
      favicon: `${__dirname}/public/favicon.ico`,
      scriptLoading: 'module',
      inject: "body",
      minify: false,
      // minify: isDev ? false : {
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
    /* Loadable Components (Code Splitting) */
    new LoadablePlugin(),
  ].concat(
    isDev ? [
      new MiniCssExtractPlugin(),
      new BundleAnalyzerPlugin({ analyzerMode: 'static' })
    ]
      : [
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
      ]),
  experiments: {
    outputModule: true,
  },
  ...isDev ? {
    optimization: {
      chunkIds: 'named',
      moduleIds: 'named',
      mangleExports: false,
      mangleWasmImports: false,
      innerGraph: true,
      minimize: false,
      providedExports: true,
      usedExports: true,
      // sideEffects: false,
    }
  } : {},
  resolve
});

// module.exports = [ serverConfig ];
// module.exports = [clientConfig, serverConfig];