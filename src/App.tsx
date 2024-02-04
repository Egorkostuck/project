import { FC } from 'react';

import { AppShell, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GoSignIn } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import NotificationError from './components/shared/notificationError/NotificationError';
import { RootState } from './store/store';

import Header from 'components/layout/header/Header';
import SingOutButton from 'components/shared/signOut/SignOut';
import router from 'routers/router';

const App: FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const error = useSelector((state: RootState) => state.user.error);

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

        {error && <NotificationError error={error} />}
      </AppShell.Main>
    </AppShell>
  );
};

export default App;
