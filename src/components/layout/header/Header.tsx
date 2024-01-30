import { FC } from 'react';

import { AppShell, Flex } from '@mantine/core';

import SwitcherTheme from 'components/shared/switcherTheme/SwitcherTheme';

interface Props {
  opened: boolean;
  toggle: () => void;
}

const Header: FC<Props> = () => {
  return (
    <AppShell.Header>
      <Flex p="md" h="100%" w="100%" align="center" justify="space-between">
        <span>Logo</span>

        <SwitcherTheme />
      </Flex>
    </AppShell.Header>
  );
};

export default Header;
