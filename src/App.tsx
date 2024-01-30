import { FC } from 'react';

import { AppShell, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GoSignIn } from 'react-icons/go';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from 'components/layout/header/Header';
import SignIn from 'components/layout/signIn/SignIn';
import SingOutButton from 'components/shared/signOut/SignOut';

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

const App: FC = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 80, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <Header opened={opened} toggle={toggle} />

      <AppShell.Navbar p="md">
        <NavLink href="/sign-in" leftSection={<GoSignIn size="24px" />} />

        <SingOutButton />
      </AppShell.Navbar>

      <AppShell.Main>
        <RouterProvider router={router} />
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
