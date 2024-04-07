// // https://medium.com/simform-engineering/how-to-implement-ssr-server-side-rendering-in-react-18-e49bc43e9531
// ;
// import express from "express";
// import ReactDOMServer from "react-dom/server";
// import { StaticRouter } from "react-router-dom/server";
// import App from "../client/src/App";

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.get("/*", (req, res) => {
//   const entryPoint = ["/main.js"];

//   const { pipe, abort: _abort } = ReactDOMServer.renderToPipeableStream(
//     <StaticRouter location={req.url}>
//       <App />
//     </StaticRouter>,
//     {
//       bootstrapScripts: entryPoint,
//       onShellReady() {
//         res.statusCode = 200;
//         res.setHeader("Content-type", "text/html");
//         pipe(res);
//       },
//       onShellError() {
//         res.statusCode = 500;
//         res.send("<!doctype html><p>Loading...</p>");
//       },
//     }
//   );
// });

// app.listen(PORT, () => {
//   console.log(`App is running on http://localhost:${PORT}`);
// });
"use strict";