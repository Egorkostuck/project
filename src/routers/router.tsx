import { createBrowserRouter } from 'react-router-dom';

import SignIn from '../components/layout/signIn/SignIn';

import { Path } from 'routers/types';

const router = createBrowserRouter([
  {
    path: Path.Home,
    element: <div>Hello world!</div>,
  },
  {
    path: Path.SignIn,
    element: <SignIn />,
  },
]);

export default router;
