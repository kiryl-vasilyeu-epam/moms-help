import { StrictCssObjectWithSelectors } from '@utils';
import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'success' | 'info' | 'danger' | 'close'

export interface ButtonProps {
  children?: ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  onClick?: () => void
  title?: string
  isSmall?: boolean
  style?: StrictCssObjectWithSelectors
}
