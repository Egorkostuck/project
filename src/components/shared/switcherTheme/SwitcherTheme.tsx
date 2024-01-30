import { FC } from 'react';

import { useMantineColorScheme, Switch, useMantineTheme, rem } from '@mantine/core';
import { LuSun } from 'react-icons/lu';
import { PiMoonStars } from 'react-icons/pi';

import {
  iconColorMoon,
  iconColorSun,
  iconMoonHeight,
  iconMoonWidth,
  iconSunHeight,
  iconSunWidth,
} from '../../layout/header/config';

const SwitcherTheme: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  const sunIcon = (
    <LuSun
      style={{ width: rem(iconSunWidth), height: rem(iconSunHeight) }}
      color={theme.colors.yellow[iconColorSun]}
    />
  );

  const moonIcon = (
    <PiMoonStars
      style={{ width: rem(iconMoonWidth), height: rem(iconMoonHeight) }}
      color={theme.colors.blue[iconColorMoon]}
    />
  );

  return (
    <Switch
      onClick={() => toggleColorScheme()}
      size="md"
      color="dark.4"
      onLabel={sunIcon}
      offLabel={moonIcon}
      checked={colorScheme === 'dark'}
    />
  );
};

export default SwitcherTheme;
