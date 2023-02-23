import './mocks';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/app';
import { UseEffectFetchingView } from './app/simple/useEffect-fetching-view';
import { ThunkFetchingView } from './app/thunk-based/thunk-fetching-view';
import { Provider } from 'react-redux';
import { store } from './app/store';

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
        path: '/react-query',
        element: <div>React query</div>,
      },
      {
        path: '/swr',
        element: <div>SWR</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
