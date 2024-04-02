
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'

import App from '../App'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme'

loadableReady(() => {
  const root = document.getElementById('app')
  hydrate(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>,
    root,
  )
})
