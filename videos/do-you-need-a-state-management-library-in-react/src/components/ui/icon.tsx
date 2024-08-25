import { forwardRef } from 'react';

import {
  Loader,
  LucideProps,
  Moon,
  ShoppingCart,
  Sun,
  SunMoon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Icon
 * -----------------------------------------------------------------------------------------------*/

interface IconProps extends LucideProps {
  name: IconName;
}

type IconName = Parameters<(typeof icons)['get']>[0];

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ size = 16, name, className, ...props }, ref) => {
    const IconElement = icons.has(name) ? icons.get(name) : undefined;

    if (!IconElement) {
      throw new Error(`No icon with name "${name}" found`);
    }

    return (
      <IconElement
        ref={ref}
        className={cn('aspect-square', className)}
        strokeWidth={1}
        size={size}
        absoluteStrokeWidth
        {...props}
      />
    );
  }
);

Icon.displayName = 'Icon';

/* -----------------------------------------------------------------------------------------------*/

const icons = new Map([
  ['loader', Loader],
  ['moon', Moon],
  ['shopping-cart', ShoppingCart],
  ['sun-moon', SunMoon],
  ['sun', Sun],
] as const satisfies readonly (readonly [string, React.FC<LucideProps>])[]);

/* -----------------------------------------------------------------------------------------------*/

export { Icon, icons };
export type { IconProps, IconName };
