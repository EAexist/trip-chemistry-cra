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
const FontPreloadPlugin = require("webpack-font-preload-plugin");

/* Pre-Render */
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');
const PrerendererPlugin = require('@prerenderer/webpack-plugin');

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
    {
      test: /\.(ttf|woff2)$/i,
      type: 'asset/resource',
      generator: {
        filename: (pathData) => {
          const filepath = path
            .dirname(pathData.filename)
            .split("/")
            .slice(1)
            .join("/");
          return `${filepath}/[name].[hash][ext][query]`;
        },
      },
    },
  ]
});

const resolve = {
  extensions: ['.js', '.ts', '.tsx'],
  alias: {
    process: "process/browser"
  },
};

/* Wepback.js. Webpack - Configuration - Output - output.assetModuleFilename
  ( https://webpack.kr/configuration/mode/ ) */
const serverConfig = (env, argv) => {
  const devMode = argv.mode === 'development';
  return ({
    target: 'node',
    entry: './src/server/index.jsx',
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'server.cjs',
    },
    module: babelLoader(devMode),
    plugins: [
      new webpack.EnvironmentPlugin({
        PORT: 3001
      }),
      new Dotenv(),
    ].concat(
      devMode ? []
      : [
        new MiniCssExtractPlugin(),
        /* Compression 
          Compression Plugins should appear after file generating plugins. */
        new CompressionPlugin({
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
        }),
        new BrotliPlugin({
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240,
        }),
      ]),
    resolve
  })
};

const clientConfig = (env, argv) => {
  const devMode = argv.mode === 'development';
  return ({
    target: ['web', 'es2017'],
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, '/dist'),
      /* Appends /static to index.html when looking for client.js. This is where Express is serving static files from */
      publicPath: 'static/',
      filename: 'app.js',
      chunkFilename: '[name].[chunkhash].js'
    },
    module: babelLoader(devMode),
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        template: `${__dirname}/public/index.html`,
        favicon: `${__dirname}/public/favicon.ico`,
        attributes: {
          "defer": function (tag, compilation, index) {
                if (( tag.tagName === 'link' ) || ( tag.tagName === 'script' )) {
                    return true;
                }
            }
        },
      }),
      new HtmlWebpackInjectAttributesPlugin(),
      new InterpolateHtmlPlugin({
        PUBLIC_URL: '/static'
      }),
      new FontPreloadPlugin(),
      /* Copy Project's public static contents( public/ : images, manifest.json, robots.txt ) to dist/  */
      new copyPlugin({
        patterns: [
          {
            from: "robots.txt", to: "robots.txt"
          },
          {
            from: "public/manifest.json", to: "manifest.json"
          },
          {
            from: "public/images", to: "images"
          }
        ]
      }),

      /* Pre-Render 
        @TODO PreRendererPlugin is not working.
      */
      new PrerendererPlugin({
        routes: [ '/', '/home/', '/test/' ],
      }),

      /* Loadable Components (Code Splitting) */
      new LoadablePlugin(),

      /* .env variables */
      // /*  !! @TODO [env variable Security Issue]
      //     ( https://stackoverflow.com/questions/41359504/webpack-bundle-js-uncaught-referenceerror-process-is-not-defined )
      // */
    ].concat(
      devMode ? []
      : [
        new MiniCssExtractPlugin({
          attributes: {
            defer: "defer",
          },
        }),
        /* Compression 
          Compression Plugins should appear after file generating plugins. */
        new CompressionPlugin({
          test: /\.js$|\.css$|\.html$/,
          // threshold: 10240,
        }),
        new BrotliPlugin({
          test: /\.js$|\.css$|\.html$/,
          // threshold: 10240,
        }),
      ]),
    experiments: {
      outputModule: true,
    },  
    optimization: {
      minimizer: devMode ? [] : [
        /* For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          ( https://webpack.kr/configuration/optimization/#optimizationminimizer ) */
        `...`,
        new CssMinimizerPlugin(),
        // new TerserPlugin(),
        // new OptimizeCSSAssetsPlugin(),
      ],
      // splitChunks: {
      //   chunks: "all",
      //   name: false,
      // },
    },
    resolve
  })
};

// module.exports = [ serverConfig ];
module.exports = [ clientConfig, serverConfig ];