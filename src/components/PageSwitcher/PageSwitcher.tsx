import { useEffect, useRef } from 'react';
import { styles, getPageAnimationStyle } from './PageSwitcher.styles';
import type { PageSwitcherProps } from './PageSwitcher.types';
import { usePageSwitcher, PageSwitcherProvider } from './PageSwitcher.hooks';

export const PageSwitcher = ({
  pages,
  initialPageIndex = 0,
  animationDuration = 300,
  animationDirection = 'left',
  onPageChange,
  containerStyle,
}: PageSwitcherProps) => {
  const {
    currentPageIndex,
    previousPageIndex,
    isAnimating,
    animationDirection: navDirection,
    navigation,
    endAnimation,
  } = usePageSwitcher({
    totalPages: pages.length,
    initialPageIndex,
    onPageChange,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAnimating) {
      timeoutRef.current = setTimeout(() => {
        endAnimation();
      }, animationDuration);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isAnimating, animationDuration, endAnimation]);

  return (
    <PageSwitcherProvider value={navigation}>
      <div css={[styles.container, containerStyle]}>
        {pages.map((page, index) => {
          const isActive = index === currentPageIndex;
          const isPrevious = index === previousPageIndex;
          const isEntering = isAnimating && isActive;
          const isLeaving = isAnimating && isPrevious;

          if (!isActive && !isPrevious && !isAnimating) {
            return null;
          }

          const { inlineStyle, cssStyle } = getPageAnimationStyle({
            isActive,
            isAnimating: isEntering || isLeaving,
            isEntering,
            animationDirection: navDirection,
            direction: animationDirection,
            duration: animationDuration,
          });

          return (
            <div
              key={index}
              css={[styles.pageWrapper, cssStyle]}
              style={inlineStyle}
            >
              {page}
            </div>
          );
        })}
      </div>
    </PageSwitcherProvider>
  );
};
