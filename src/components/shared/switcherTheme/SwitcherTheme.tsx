import { FC } from 'react';

import { useMantineColorScheme, Switch, useMantineTheme } from '@mantine/core';
import { LuSun } from 'react-icons/lu';
import { PiMoonStars } from 'react-icons/pi';

import {
  iconSize,
  iconColorMoon,
  iconColorSun,
} from 'components/shared/switcherTheme/config';
import { ColorScheme } from 'components/shared/switcherTheme/types';

const SwitcherTheme: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const sunIcon = <LuSun style={iconSize} color={theme.colors.yellow[iconColorSun]} />;

  const moonIcon = (
    <PiMoonStars style={iconSize} color={theme.colors.blue[iconColorMoon]} />
  );

  return (
    <Switch
      onClick={toggleColorScheme}
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      checked={colorScheme === ColorScheme.Dark}
    />
  );
};

export default SwitcherTheme;
