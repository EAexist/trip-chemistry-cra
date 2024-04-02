
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import App from './App'
import { theme } from './theme'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);