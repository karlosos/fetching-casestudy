import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './app/app';
import { ReduxThunkTable } from './app/redux-thunk';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <ReduxThunkTable />,
      },
      {
        index: true,
        path: 'redux-thunk',
        element: <ReduxThunkTable />,
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
