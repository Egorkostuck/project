import { createBrowserRouter } from 'react-router-dom';

import SignIn from '../components/layout/signIn/SignIn';

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
]);

export default router;
