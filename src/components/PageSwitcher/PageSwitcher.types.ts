import { StrictCssObjectWithSelectors } from '@utils';
import type { ReactNode } from 'react';

export type AnimationDirection = 'left' | 'right' | 'up' | 'down' | 'fade';

export interface PageSwitcherNavigation {
  goToPage: (pageIndex: number) => void;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  currentPageIndex: number;
  totalPages: number;
}

export interface PageSwitcherProps {
  pages: ReactNode[];
  initialPageIndex?: number;
  animationDuration?: number;
  animationDirection?: AnimationDirection;
  onPageChange?: (pageIndex: number) => void;
  containerStyle?: StrictCssObjectWithSelectors;
}
