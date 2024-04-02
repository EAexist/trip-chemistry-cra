import { CacheProvider } from '@emotion/react';
import { loadableReady } from '@loadable/component';
import { ThemeProvider } from '@mui/material/styles';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import createEmotionCache from './createEmotionCache';
import reportWebVitals from './reportWebVitals';
import { theme } from './theme';

import './styles/index.css';

const cache = createEmotionCache();

/* 3. Loadable Components. Server Side Rendering. 
  https://loadable-components.com/docs/server-side-rendering/
*/
loadableReady(() => {
    hydrateRoot(
        document.getElementById('root') as HTMLElement,
        // <CacheProvider value={cache}>
            // <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            // </ThemeProvider>
        // </CacheProvider>,
    );
})
/* 
  https://github.com/stereobooster/react-snap */
// const rootElement = document.getElementById("root") as HTMLElement;
// if (rootElement.hasChildNodes()) {
//   hydrateRoot(
//     document.getElementById('root') as HTMLElement,  
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// } else {
//   const root = createRoot(document.getElementById('root') as HTMLElement);
//   root.render(npm uninsta
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();