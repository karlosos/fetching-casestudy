import './mocks';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/app';
import { UseEffectView } from './app/simple/useEffect-view';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SwrView } from './app/swr/swr-view';
import { TanstackQueryView } from './app/tanstack-query/tanstack-query-view';
import { RtkQueryView } from './app/rtk-query/rtk-query-view';
import { RtkQueryFnView } from './app/rtk-query-queryfn/rtk-query-fn-view';
import { ThunkView } from './app/thunk-based/thunk-view';
import { AsyncThunkView } from './app/createAsyncThunk/createAsyncThunk-view';
import { MantineProvider } from '@mantine/core';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <UseEffectView />,
      },
      {
        index: true,
        path: '/useEffect',
        element: <UseEffectView />,
      },
      {
        path: '/redux-thunk',
        element: <ThunkView />,
      },
      {
        path: '/createAsyncThunk',
        element: <AsyncThunkView />,
      },
      {
        path: '/rtk-query',
        element: <RtkQueryView />,
      },
      {
        path: '/rtk-query-queryfn',
        element: <RtkQueryFnView />,
      },
      {
        path: '/tanstack-query',
        element: <TanstackQueryView />,
      },
      {
        path: '/swr',
        element: <SwrView />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ fontFamily: "Inter, sans-serif" }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </MantineProvider>
  </StrictMode>
);
