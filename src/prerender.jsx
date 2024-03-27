import { StaticRouter } from "react-router-dom/server"
import { ChunkExtractor } from '@loadable/server'
import { renderToString } from "react-dom/server"
import { generate } from 'critical';
import fs from 'fs';
import path from "path";
import { mkdirp } from "mkdirp";
import brotli from "brotli";
import App from "./App"

const statsFile = path.resolve(`${__dirname}/loadable-stats.json`);
const extractor = new ChunkExtractor({ statsFile });

const createReactApp = async ( location ) => {

  const jsx = extractor.collectChunks(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>
  )

  const reactApp = renderToString(jsx);

  const html = await fs.promises.readFile(`${__dirname}/index.html`, 'utf-8');
  const reactHtml = html.replace(
    '<div id="root"></div>', `<div id="root">${reactApp}</div>`);
  return reactHtml;
};

const routes = ['/home'];

routes.forEach( async route => {
  try {
    const outputDir = path.join(__dirname, route)
    const outputFile = `${outputDir}/index.html`
    const indexHtml = await createReactApp(route);

    mkdirp.sync(outputDir)
    fs.writeFileSync(outputFile, indexHtml);
    generate({
      inline: true,
      base: outputDir,
      src: 'index.html',
      target: 'index.html',
    });
    // brotli.compress(fs.readFileSync(outputFile));

  } catch (e) {
  }
})