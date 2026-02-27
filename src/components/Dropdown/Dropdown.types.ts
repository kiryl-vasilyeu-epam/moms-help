import type { ReactNode } from 'react';
import type { StrictCssObjectWithSelectors } from '@utils';

export interface DropdownProps {
  children?: ReactNode;
  open: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
  style?: StrictCssObjectWithSelectors;
}
