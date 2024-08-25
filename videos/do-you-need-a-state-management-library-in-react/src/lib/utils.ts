import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '../../tailwind.config';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const tw = resolveConfig(tailwindConfig);

export interface Stylable {
  className?: string;
}

export function countDigits(num: number) {
  return Math.max(Math.floor(Math.log10(Math.abs(num))), 0) + 1;
}

export function getNumberSign(num: number, zeroIsPositive: boolean = true) {
  if (!zeroIsPositive && num === 0) {
    return '';
  }

  return num >= 0 ? '+' : '-';
}

export function capitalize(str: string) {
  const [first, ...rest] = str.split('');

  return `${first.toUpperCase()}${rest.join('')}`;
}
