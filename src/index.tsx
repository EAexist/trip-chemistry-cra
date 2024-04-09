import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import App from './App'
import { theme } from './theme'

import { HelmetProvider } from 'react-helmet-async'
import './styles/index.css'

const root = createRoot(document.getElementById('root'));

root.render(
    <HelmetProvider>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ThemeProvider>
    </HelmetProvider>
);