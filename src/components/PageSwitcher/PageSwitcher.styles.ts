import { createStyles } from '@utils';
import { css, keyframes, SerializedStyles } from '@emotion/react';
import type { AnimationDirection } from './PageSwitcher.types';

const slideInFromRight = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideInFromLeft = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideInFromBottom = keyframes`
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
`;

const slideInFromTop = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const styles = createStyles({
  container: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  pageWrapper: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});

interface PageAnimationStyleParams {
  isActive: boolean;
  isAnimating: boolean;
  isEntering: boolean;
  animationDirection: 'forward' | 'backward';
  direction: AnimationDirection;
  duration: number;
}

interface PageAnimationResult {
  inlineStyle: React.CSSProperties;
  cssStyle: SerializedStyles | null;
}

const getEnteringAnimation = (
  direction: AnimationDirection,
  isForward: boolean,
  duration: number,
): SerializedStyles => {
  let animation;
  switch (direction) {
    case 'left':
      animation = isForward ? slideInFromRight : slideInFromLeft;
      break;
    case 'right':
      animation = isForward ? slideInFromLeft : slideInFromRight;
      break;
    case 'up':
      animation = isForward ? slideInFromBottom : slideInFromTop;
      break;
    case 'down':
      animation = isForward ? slideInFromTop : slideInFromBottom;
      break;
    case 'fade':
    default:
      animation = fadeIn;
  }
  return css`
    animation: ${animation} ${duration}ms ease-in-out forwards;
  `;
};

export const getPageAnimationStyle = ({
  isActive,
  isAnimating,
  isEntering,
  animationDirection,
  direction,
  duration,
}: PageAnimationStyleParams): PageAnimationResult => {
  const isForward = animationDirection === 'forward';

  const getExitingTransform = (): string => {
    const sign = isForward ? -1 : 1;
    switch (direction) {
      case 'left':
        return `translateX(${sign * 100}%)`;
      case 'right':
        return `translateX(${-sign * 100}%)`;
      case 'up':
        return `translateY(${sign * 100}%)`;
      case 'down':
        return `translateY(${-sign * 100}%)`;
      case 'fade':
      default:
        return 'translateX(0)';
    }
  };

  if (!isAnimating) {
    return {
      inlineStyle: {
        transform: isActive ? 'translateX(0)' : 'translateX(100%)',
        opacity: isActive ? 1 : 0,
        visibility: isActive ? 'visible' : 'hidden',
        zIndex: isActive ? 1 : 0,
      },
      cssStyle: null,
    };
  }

  if (isEntering) {
    return {
      inlineStyle: {
        zIndex: 2,
        visibility: 'visible',
        opacity: 1,
      },
      cssStyle: getEnteringAnimation(direction, isForward, duration),
    };
  }

  // Exiting
  return {
    inlineStyle: {
      transform: getExitingTransform(),
      opacity: direction === 'fade' ? 0 : 1,
      transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`,
      zIndex: 1,
      visibility: 'visible',
    },
    cssStyle: null,
  };
};
