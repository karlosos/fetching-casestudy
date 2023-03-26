import './mocks';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/app';
import { UseEffectFetchingView } from './app/simple/useEffect-fetching-view';
import { ThunkFetchingView } from './app/thunk-based/thunk-fetching-view';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AsyncThunkFetchingView } from './app/createAsyncThunk/createAsyncThunk-fetching-view';
import { RtkQueryView } from './app/rtk-query/rtk-query-view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SwrView } from './app/swr/swr-view';
import { TanstackQueryView } from './app/tanstack-query/tanstack-query-view';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <UseEffectFetchingView />,
      },
      {
        index: true,
        path: '/useEffect',
        element: <UseEffectFetchingView />,
      },
      {
        path: '/redux-thunk',
        element: <ThunkFetchingView />,
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
