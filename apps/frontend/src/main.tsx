import './mocks';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/app';
import { UseEffectFetchingView } from './app/useEffect-fetching-view';

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
        path: 'use-effect',
        element: <UseEffectFetchingView />,
      },
      {
        path: 'redux-thunk',
        element: <UseEffectFetchingView />,
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
    <RouterProvider router={router} />
  </StrictMode>
);
