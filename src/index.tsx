import './index.css';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { loadableReady } from '@loadable/component';


/* 1. CSR */
const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

/* 2. SSR */
// hydrateRoot(
//   document.getElementById('root') as HTMLElement,  
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

/* 3. Loadable Components. Server Side Rendering. 
  https://loadable-components.com/docs/server-side-rendering/
*/
// loadableReady(()=>{
//   hydrateRoot(
//     document.getElementById('root') as HTMLElement,  
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// })

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
//   root.render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();