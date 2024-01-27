/* React Packages */
import { Navigate, Outlet, Route, RouterProvider, ScrollRestoration, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import { Menu } from '@mui/icons-material';

/* App */
import './index.css';
import TestContent from './content/TestContent';
import { TEST } from './common/app-const';
import CityDetailContent from './content/CityDetailContent';
import { store } from './store';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { AppBarContextProvider } from './contexts/AppBarContext';
import GlobalStyles from './components/GlobalStyles';
import AppBar from './components/AppBar/AppBar';
import Page from './Page';
import ResultContent from './content/ResultContent';
import ChemistryContent from './content/ChemistryContent';

function App() {

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#FFFFFF',
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          elevation: 2,
          color: "secondary",
        }
      },
      MuiDrawer: {
        defaultProps: {
          sx: {
            zIndex: (theme) => theme.zIndex.appBar - 1,
            // flexShrink: 0,
          }
        }
      },
      MuiStack: {
        defaultProps: {
          direction: 'row',
          alignItems: 'center'
        }
      },
    }
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path={'/*'} element={<Page />}>
          <Route key={'index'} index element={<Navigate to={'test'} replace />} />
          {/* <Route key={'home'} path={'/'} element={<></>} /> */}
          <Route key={'test'} path={'test'} element={
            <>
              <Outlet />
              {/* https://reactrouter.com/en/main/components/scroll-restoration */}
              <ScrollRestoration getKey={(location, matches) => {
                const paths = ["/test"];
                console.log(`[ScrollRestoration] ${location.pathname}`)
                return paths.includes(location.pathname)
                  ? // restore by pathname
                  location.pathname
                  : // everything else by location like the browser
                  location.key;
              }} />
            </>
          }>
            <Route key={'/'} index element={<TestContent />} />
            {
              Object.keys(TEST.city.subTests).map((cityClass) => (
                <Route key={`city/${cityClass}`} path={`city/${cityClass}`} element={<CityDetailContent cityClass={cityClass as keyof typeof TEST.city.subTests} />} />
              ))
            }
          </Route>
          <Route key={'result'} path={'result'} element={ <ResultContent/> }/>
          <Route key={'chemistry'} path={'chemistry'} element={ <ChemistryContent/> }/>
        </Route>
      </>
    )
  );

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppBarContextProvider>
          <AnimatePresence>
            <RouterProvider router={router} />
          </AnimatePresence>
          {/* </Content> */}
        </AppBarContextProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
