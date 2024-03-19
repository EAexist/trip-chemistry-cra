/***************************************************************************************
*    Title: A Complete Guide to Server-Side Rendering (SSR) with React.js
*    Author: Mehul Mohan
*    Date: 2023, Mar. 20.
*    Availability: https://codedamn.com/news/reactjs/server-side-rendering-reactjs*
***************************************************************************************/
/***************************************************************************************
*    Title: webpack-typescript-개발환경-설정하기
*    Author: SSH
*    Date: 2021, May. 3.
*    Availability: https://velog.io/@ssh1997/webpack-typescript-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD-%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0
***************************************************************************************/

// https://iamwebwiz.medium.com/how-to-fix-dirname-is-not-defined-in-es-module-scope-34d94a86694d

const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

// import path from 'path';
// import { fileURLToPath } from 'url';
// import webpackNodeExternals from 'webpack-node-externals';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

module.exports = {
  target: 'node',
  mode: 'development',
  externals: [webpackNodeExternals()],
  entry: './server/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              {
                "modules": false
              }
            ],
          },
        },
      },
      // {
      //   test: /\.(ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'ts-loader',
      //   },
      // },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  exclude: /(node_modules|bower_components)/,
};