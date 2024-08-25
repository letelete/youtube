import { useEffect, useRef } from 'react';

import {
  AnimatePresence,
  clamp,
  HTMLMotionProps,
  motion,
  Variants,
} from 'framer-motion';

import { Button, ButtonProps } from '@/components/ui/button';
import { cn, countDigits, getNumberSign } from '@/lib/utils';

/* -------------------------------------------------------------------------------------------------
 * Counter
 * -----------------------------------------------------------------------------------------------*/

const ANIMATE_Y_OFFSET = 32;

interface VariantsCustomProps {
  direction: number;
}

const variants = {
  enter: ({ direction }: VariantsCustomProps) => {
    return {
      y: direction > 0 ? -ANIMATE_Y_OFFSET : ANIMATE_Y_OFFSET,
      opacity: 0.25,
      scale: 0.66,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: ({ direction }: VariantsCustomProps) => {
    return {
      zIndex: 0,
      y: direction > 0 ? ANIMATE_Y_OFFSET : -ANIMATE_Y_OFFSET,
      opacity: 0,
      scale: 0.66,
    };
  },
} satisfies Variants;

/* -----------------------------------------------------------------------------------------------*/

function Counter({
  value,
  maxValue,
  minValue,
  incrementBy,
  className,
  onChange,
  ...rest
}: Omit<HTMLMotionProps<'div'>, 'onChange'> & {
  value: number;
  maxValue?: number;
  minValue?: number;
  incrementBy: number;
  className?: string;
  onChange?: (value: number) => void;
}) {
  const previousValue = useRef(value);
  const direction = clamp(-1, 1, value - previousValue.current);

  useEffect(() => {
    return () => {
      previousValue.current = value;
    };
  }, [value]);

  return (
    <motion.div
      className={cn('flex items-center gap-x-2', className)}
      layout
      {...rest}
    >
      <IncrementButton
        disabled={Boolean(minValue && value <= minValue)}
        by={-incrementBy}
        onIncrement={onChange}
      />

      <CounterDisplay value={value} direction={direction} />

      <IncrementButton
        disabled={Boolean(maxValue && value >= maxValue)}
        by={incrementBy}
        onIncrement={onChange}
      />
    </motion.div>
  );
}

Counter.displayName = 'Counter';

/* -------------------------------------------------------------------------------------------------
 * IncrementButton
 * -----------------------------------------------------------------------------------------------*/

function IncrementButton({
  by,
  onIncrement,
  onClick,
  size = 'sm',
  ...rest
}: ButtonProps & {
  by: number;
  onIncrement?: (by: number) => void;
}) {
  const label = `${getNumberSign(by)}${Math.abs(by)}`;

  return (
    <Button
      {...rest}
      size={size}
      onClick={(e) => {
        onClick?.(e);
        onIncrement?.(by);
      }}
      layout
    >
      {label}
    </Button>
  );
}

IncrementButton.displayName = 'IncrementButton';

/* -------------------------------------------------------------------------------------------------
 * CounterDisplay
 * -----------------------------------------------------------------------------------------------*/

function CounterDisplay({
  value,
  direction,
}: {
  value: number;
  direction: number;
}) {
  const signWidth = value < 0 ? 1 : 0;
  const containerWidth = `${signWidth + countDigits(value)}ch`;

  return (
    <motion.div
      className='flex justify-center'
      style={{ width: containerWidth }}
    >
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.p
          className='relative w-full text-center'
          key={value}
          custom={
            {
              direction,
            } satisfies VariantsCustomProps
          }
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.2 },
          }}
        >
          {value}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

CounterDisplay.displayName = 'CounterDisplay';

/* -----------------------------------------------------------------------------------------------*/

export { Counter };
