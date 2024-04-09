import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import App from './App'
import { theme } from './theme'

import './styles/index.css';
import { Provider } from 'react-redux'
import { store } from './store'

const root = createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}>
    {/* <Provider store={store}> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </Provider> */}
  </ThemeProvider>
);