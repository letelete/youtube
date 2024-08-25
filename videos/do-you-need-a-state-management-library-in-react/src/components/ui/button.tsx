import {
  ButtonHTMLAttributes,
  Children,
  cloneElement,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  isValidElement,
  ReactElement,
  useMemo,
} from 'react';

import { Slot } from '@radix-ui/react-slot';
import { Link, LinkProps } from '@tanstack/react-router';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  HTMLMotionProps,
  motion,
  TargetAndTransition,
  VariantLabels,
} from 'framer-motion';

import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface PolymorphicButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

/**
 * @param {@link asChild} - Polymorph into the child component {@see https://www.radix-ui.com/primitives/docs/utilities/slot#basic-example}
 */

const PolymorphicButton = forwardRef<HTMLButtonElement, PolymorphicButtonProps>(
  (
    { className, variant, size, disabled, asChild = false, children, ...props },
    ref
  ) => {
    const PolymorphicComponent = asChild ? Slot : 'button';

    return (
      <PolymorphicComponent
        {...props}
        ref={ref}
        aria-disabled={disabled}
        disabled={Boolean(disabled)}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className
        )}
      >
        {children}
      </PolymorphicComponent>
    );
  }
);

PolymorphicButton.displayName = 'PolymorphicButton';

/* -----------------------------------------------------------------------------------------------*/

const MotionPolymorphicButton = motion(PolymorphicButton);

const buttonMotionProps = {
  whileTap: { scale: 0.8 },
  transition: { type: 'spring', duration: 0.2, bounce: 0 },
} as const satisfies HTMLMotionProps<'button'>;

interface ButtonProps
  extends ComponentPropsWithoutRef<typeof MotionPolymorphicButton> {
  disableDefaultMotion?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ disableDefaultMotion, ...buttonProps }, ref) => {
    const whileTapMerged = useMemo<
      VariantLabels | TargetAndTransition | undefined
    >(() => {
      if (buttonProps.disabled) {
        return undefined;
      }
      if (disableDefaultMotion) {
        return buttonProps.whileTap;
      }
      if (
        buttonProps.whileTap === undefined ||
        typeof buttonProps.whileTap === 'object'
      ) {
        return { ...buttonMotionProps.whileTap, ...buttonProps.whileTap };
      }
      return buttonProps.whileTap;
    }, [buttonProps.disabled, buttonProps.whileTap, disableDefaultMotion]);

    return (
      <MotionPolymorphicButton
        {...buttonMotionProps}
        {...buttonProps}
        ref={ref}
        whileTap={whileTapMerged}
      />
    );
  }
);

Button.displayName = 'Button';

/* -------------------------------------------------------------------------------------------------
 * LinkButton
 * -----------------------------------------------------------------------------------------------*/

function LinkButton({
  to,
  className,
  children,
  ...rest
}: ButtonProps & {
  to: LinkProps['to'];
}) {
  return (
    <Button
      {...rest}
      variant='link'
      className={cn('[&.active]:font-bold', className)}
      asChild
      disableDefaultMotion
    >
      <Link to={to}>{children}</Link>
    </Button>
  );
}

LinkButton.displayName = 'LinkButton';

/* -------------------------------------------------------------------------------------------------
 * IconButton
 * -----------------------------------------------------------------------------------------------*/

export interface IconButtonProps extends Omit<ButtonProps, 'asChild'> {
  accessibleLabel: string;
}

const IconButton = forwardRef<ElementRef<typeof Button>, IconButtonProps>(
  ({ accessibleLabel, children, ...rest }: IconButtonProps) => {
    const icon = Children.only(children);

    if (!isValidElement(icon)) {
      throw new Error('Invalid React element');
    }

    return (
      <Button title={accessibleLabel} {...rest}>
        {cloneElement(icon as ReactElement, {
          'aria-hidden': true,
          focusable: false,
        })}

        <VisuallyHidden>{accessibleLabel}</VisuallyHidden>
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';

/* -----------------------------------------------------------------------------------------------*/

export { Button, buttonVariants, LinkButton, IconButton };
export type { ButtonProps };
