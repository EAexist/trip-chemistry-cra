import { hydrateRoot, createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// var isBrowser = window !== undefined

// if(isBrowser){
//   /* CSR */
//   console.log(`[src/index.tsx] isBrowser = true. Rendering App in client side`);
//   const root = createRoot(document.getElementById('root') as HTMLElement);
//   root.render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }
// else{
//   /* SSR with Express.js */
//   console.log(`[src/index.tsx] isBrowser = false. Rendering App in server side`);
//   hydrateRoot(
//     document.getElementById('root') as HTMLElement,  
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   );
// }

hydrateRoot(
  document.getElementById('root') as HTMLElement,  
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();