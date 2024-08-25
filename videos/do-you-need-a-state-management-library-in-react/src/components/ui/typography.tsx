import {
  cloneElement,
  isValidElement,
  useCallback,
  type HTMLAttributes,
  type PropsWithChildren,
} from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Typography
 * -----------------------------------------------------------------------------------------------*/

const typographyVariants = cva(cn('text-left tracking-normal'), {
  variants: {
    variant: {
      heading:
        'font-primary max-w-prose text-[1.75rem] font-semibold leading-8',
      'sub-heading':
        'font-primary max-w-prose text-[1.375rem] font-semibold leading-8',
      'body-md': 'font-primary text-[1.25rem] leading-8',
      body: 'font-primary text-base leading-7',
      'body-sm': 'font-primary text-sm leading-6',
      'body-xs': 'font-primary text-xs leading-6',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});

interface TypographyProps
  extends Omit<HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean;
}

const Typography = ({
  asChild,
  variant,
  className,
  children,
  ...rest
}: TypographyProps) => {
  const PolymorphicComponent = asChild ? Slot : 'div';

  const renderAsChild = useCallback(() => {
    if (!children || !isValidElement(children)) {
      return null;
    }

    const element = (children.props as PropsWithChildren).children;
    return cloneElement(children, undefined, element);
  }, [children]);

  return (
    <PolymorphicComponent
      className={cn(typographyVariants({ variant }), className)}
      {...rest}
    >
      {asChild ? renderAsChild() : children}
    </PolymorphicComponent>
  );
};

/* -----------------------------------------------------------------------------------------------*/

export { Typography, typographyVariants };
export type { TypographyProps };
