import { useMemo } from 'react';

import { motion, Variants } from 'framer-motion';

import { Theme, useTheme } from '@/components/theme-provider';
import { IconButton } from '@/components/ui/button';
import { Icon, IconName } from '@/components/ui/icon';
import { capitalize } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * ThemeToggleButton
 * -----------------------------------------------------------------------------------------------*/

const MotionIcon = motion(Icon);

const iconVariants = {
  hidden: {
    rotate: '90deg',
    scale: 0,
  },
  shown: {
    rotate: '0deg',
    scale: 1,
  },
} satisfies Variants;

function* createThemeIterator(
  initialTheme?: Theme
): Generator<Theme, Theme, Theme> {
  const themes = ['dark', 'light', 'system'] as const satisfies Theme[];

  let it = Math.max(
    themes.findIndex((entry) => entry === initialTheme),
    0
  );

  while (true) {
    it = (it + 1) % themes.length;
    yield themes[it];
  }
}

const themeToIcon: Record<Theme, IconName> = {
  dark: 'moon',
  light: 'sun',
  system: 'sun-moon',
};

const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();

  const themeIterator = useMemo(() => createThemeIterator(theme), [theme]);

  return (
    <IconButton
      title={`${capitalize(theme)} theme`}
      variant='ghost'
      size='icon'
      accessibleLabel='Toggle theme'
      onClick={() => setTheme(themeIterator.next().value)}
    >
      <MotionIcon
        key={theme}
        variants={iconVariants}
        initial='hidden'
        animate='shown'
        name={themeToIcon[theme]}
      />
    </IconButton>
  );
};

ThemeToggleButton.displayName = 'ThemeToggleButton';

/* -----------------------------------------------------------------------------------------------*/

export { ThemeToggleButton };
