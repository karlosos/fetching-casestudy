import './mocks';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/app';
import { UseEffectView } from './app/simple/useEffect-view';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AsyncThunkFetchingView } from './app/createAsyncThunk/createAsyncThunk-fetching-view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SwrView } from './app/swr/swr-view';
import { TanstackQueryView } from './app/tanstack-query/tanstack-query-view';
import { RtkQueryView } from './app/rtk-query/rtk-query-view';
import { ThunkView } from './app/thunk-based/thunk-view';

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
        element: <AsyncThunkFetchingView />,
      },
      {
        path: '/rtk-query',
        element: <RtkQueryView />,
      },
      {
        path: '/tanstack-query',
        element: <TanstackQueryView />,
      },
      {
        path: '/swr',
        element: <SwrView />
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
