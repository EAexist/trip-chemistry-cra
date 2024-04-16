import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { theme } from './theme'

import { HelmetProvider } from 'react-helmet-async'
import routes from './routes'
import './styles/index.css'

const root = createRoot(document.getElementById('root'));

/*  React Router - Routers - Picking A Router. Remix Software, Inc.
    ( https://reactrouter.com/en/main/guides/ssr ) */
let router = createBrowserRouter(routes);

root.render(
    <HelmetProvider>
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
        </ThemeProvider>
    </HelmetProvider>
);