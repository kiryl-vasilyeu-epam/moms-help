import {
  useState,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react';
import type { PageSwitcherNavigation } from './PageSwitcher.types';

const PageSwitcherContext = createContext<PageSwitcherNavigation | null>(null);

export const PageSwitcherProvider = PageSwitcherContext.Provider;

export const usePageSwitcherNavigation = (): PageSwitcherNavigation => {
  const context = useContext(PageSwitcherContext);
  if (!context) {
    throw new Error(
      'usePageSwitcherNavigation must be used within a PageSwitcher',
    );
  }
  return context;
};

interface UsePageSwitcherParams {
  totalPages: number;
  initialPageIndex?: number;
  onPageChange?: (pageIndex: number) => void;
}

interface UsePageSwitcherReturn {
  currentPageIndex: number;
  previousPageIndex: number | null;
  isAnimating: boolean;
  animationDirection: 'forward' | 'backward';
  navigation: PageSwitcherNavigation;
  endAnimation: () => void;
}

export const usePageSwitcher = ({
  totalPages,
  initialPageIndex = 0,
  onPageChange,
}: UsePageSwitcherParams): UsePageSwitcherReturn => {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPageIndex);
  const [previousPageIndex, setPreviousPageIndex] = useState<number | null>(
    null,
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<
    'forward' | 'backward'
  >('forward');

  const goToPage = useCallback(
    (targetIndex: number) => {
      if (
        targetIndex === currentPageIndex ||
        targetIndex < 0 ||
        targetIndex >= totalPages
      ) {
        return;
      }

      setAnimationDirection(
        targetIndex > currentPageIndex ? 'forward' : 'backward',
      );
      setPreviousPageIndex(currentPageIndex);
      setIsAnimating(true);
      setCurrentPageIndex(targetIndex);
      onPageChange?.(targetIndex);
    },
    [currentPageIndex, totalPages, onPageChange],
  );

  const endAnimation = useCallback(() => {
    setIsAnimating(false);
    setPreviousPageIndex(null);
  }, []);

  const goToNextPage = useCallback(() => {
    if (currentPageIndex < totalPages - 1) {
      goToPage(currentPageIndex + 1);
    }
  }, [currentPageIndex, totalPages, goToPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      goToPage(currentPageIndex - 1);
    }
  }, [currentPageIndex, goToPage]);

  const navigation: PageSwitcherNavigation = useMemo(
    () => ({
      goToPage,
      goToNextPage,
      goToPrevPage,
      currentPageIndex,
      totalPages,
    }),
    [goToPage, goToNextPage, goToPrevPage, currentPageIndex, totalPages],
  );

  return {
    currentPageIndex,
    previousPageIndex,
    isAnimating,
    animationDirection,
    navigation,
    endAnimation,
  };
};
