import type { ReactNode } from 'react';
import type { StrictCssObjectWithSelectors } from '@utils';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'label';

export type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'white'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info';

export interface TypographyProps {
  children: ReactNode;
  variant?: TypographyVariant;
  color?: TypographyColor;
  style?:
    | StrictCssObjectWithSelectors
    | (StrictCssObjectWithSelectors | false)[];
  bold?: boolean;
  className?: string;
}
