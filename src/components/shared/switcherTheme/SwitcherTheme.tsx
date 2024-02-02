import { FC } from 'react';

import { useMantineColorScheme, Switch, useMantineTheme } from '@mantine/core';
import { LuSun } from 'react-icons/lu';
import { PiMoonStars } from 'react-icons/pi';

import {
  iconSize,
  iconColorMoon,
  iconColorSun,
  colorSwitcher,
  sizeSwitcher,
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
      onClick={() => toggleColorScheme()}
      size={sizeSwitcher}
      color={colorSwitcher}
      onLabel={sunIcon}
      offLabel={moonIcon}
      checked={colorScheme === ColorScheme.Dark}
    />
  );
};

export default SwitcherTheme;
