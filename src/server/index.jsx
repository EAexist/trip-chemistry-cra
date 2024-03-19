/***************************************************************************************
 * 
*    Title: Server Side Rendering React with Express
*    Author: WittCode
*    Date: 2023, Nov. 14.
*    Availability: https://wittcode.com/blogs/server-side-rendering-react-with-express

*    Title: A Complete Guide to Server-Side Rendering (SSR) with React.js
*    Author: Mehul Mohan
*    Date: 2023, Mar. 20.
*    Availability: https://codedamn.com/news/reactjs/server-side-rendering-reactjs*

***************************************************************************************/
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "../App.tsx";
import fs from 'fs';
// const express = require('express');
// const React = require('react');
// const ReactDOMServer = require('react-dom/server');
// const App = require('./client/src/App').default;

const app = express();
app.use('/static', express.static(__dirname));

const PORT = process.env.PORT || 3001;

const createReactApp = async (location) => {
  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  );
  console.log(`location=${location} reactApp=${reactApp.slice(0, 10)}`);
  const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8');
  const reactHtml = html.replace(
    '<div id="root"></div>', `<div id="root">${reactApp}</div>`);
  return reactHtml;
};

app.get('/robots.txt', async (req, res) => {
  console.log(`/robots.txt`);
  const robots = await fs.promises.readFile(`${__dirname}/robots.txt`, 'utf-8');
  res.status(200).send(robots);
});

app.get('*', async (req, res) => {
  const indexHtml = await createReactApp(req.url);
  res.status(200).send(indexHtml);
  // res.status(200).send("HI");

  // const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
  //   <StaticRouter location={req.url}>
  //     <App />
  //   </StaticRouter>,
  //   {
  //     bootstrapScripts: entryPoint,
  //     onShellReady() {
  //       res.statusCode = 200;
  //       res.setHeader("Content-type", "text/html");
  //       pipe(res);
  //     },
  //     onShellError() {
  //       res.statusCode = 500;
  //       res.send("<!doctype html><p>Loading...</p>");
  //     },
  //   }
  // );
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});