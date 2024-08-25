import { ComponentPropsWithoutRef } from 'react';

import { cva, VariantProps } from 'class-variance-authority';

import { Typography, TypographyProps } from '@/components/ui/typography';
import { useElementGeometry } from '@/hooks/use-element-geometry';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * BadgeContainer
 * -----------------------------------------------------------------------------------------------*/

type BadgeContainerProps = ComponentPropsWithoutRef<'div'>;

const BadgeContainer = ({ children, className }: BadgeContainerProps) => {
  return (
    <div
      className={cn('group/badge-container relative', className)}
      badge-container='true'
    >
      {children}
    </div>
  );
};

BadgeContainer.displayName = 'BadgeContainer';

/* -------------------------------------------------------------------------------------------------
 * Badge
 * -----------------------------------------------------------------------------------------------*/

const badgeVariants = cva(
  cn(
    'flex items-center justify-center rounded-full border border-background bg-destructive p-1 text-destructive-foreground',
    'absolute bottom-[calc(100%-0.25em)] left-[calc(100%-0.25em)] z-10'
  )
);

interface BadgeProps
  extends ComponentPropsWithoutRef<'div'>,
    VariantProps<typeof badgeVariants> {}

const Badge = ({ className, ...rest }: BadgeProps) => {
  const [ref, geometry] = useElementGeometry();

  return (
    <div
      ref={ref}
      className={cn(badgeVariants(), className)}
      style={{ minWidth: `${geometry.height}px` }}
      {...rest}
    />
  );
};

/* -------------------------------------------------------------------------------------------------
 * BadgeLabel
 * -----------------------------------------------------------------------------------------------*/

interface BadgeLabelProps extends Omit<TypographyProps, 'children'> {
  value: number;
  overflowCount?: number;
  standalone?: boolean;
}

const BadgeLabel = ({
  value,
  overflowCount = 99,
  className,
  ...rest
}: BadgeLabelProps) => {
  const label = Math.min(value, overflowCount);
  const isOverflowing = value > overflowCount;

  return (
    <Typography
      variant='body-xs'
      className={cn(
        'whitespace-nowrap text-nowrap leading-none text-inherit',
        className
      )}
      {...rest}
    >
      {label}
      {isOverflowing ? '+' : null}
    </Typography>
  );
};

BadgeLabel.displayName = 'BadgeLabel';

/* -----------------------------------------------------------------------------------------------*/

export { BadgeContainer, Badge, badgeVariants, BadgeLabel };
export type { BadgeContainerProps, BadgeProps, BadgeLabelProps };
