import type { ComponentPropsWithoutRef } from 'react';

import { VisuallyHidden as VisuallyHiddenPrimitive } from '@radix-ui/react-visually-hidden';

export type VisuallyHidden = ComponentPropsWithoutRef<'span'>;

export const VisuallyHidden = ({ children, ...props }: VisuallyHidden) => {
  return (
    <VisuallyHiddenPrimitive {...props}>{children}</VisuallyHiddenPrimitive>
  );
};
