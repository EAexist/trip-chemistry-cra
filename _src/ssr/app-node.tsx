/**
 * inspired by:
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/src/AppSsr.jsx
 * @see https://github.com/pagespeed-green/react-ssr/blob/master/tools/ssr.js#L57
 */

import { createStaticHandler, createStaticRouter, StaticHandlerContext, StaticRouterProvider } from 'react-router-dom/server';
import routes from '../routes';
import createFetchRequest from '../server/request';

const handler = createStaticHandler(routes);

const AppSSR = async ({ req, res }) => {
  let fetchRequest = createFetchRequest(req, res);
  let context = await handler.query(fetchRequest) as StaticHandlerContext;

  let router = createStaticRouter(
    handler.dataRoutes,
    context
  );
  return (
    <StaticRouterProvider
      router={router}
      context={context}
    />
  )
}

export default AppSSR
