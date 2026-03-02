import type { HamburgerButtonProps } from './HamburgerButton.types';
import { stylesheet } from './HamburgerButton.styles';
import { useStyles } from '@hooks';

export const HamburgerButton = ({
  handleToggle,
  isOpen,
}: HamburgerButtonProps) => {
  const styles = useStyles(stylesheet);
  return (
    <button css={styles.toggle} onClick={handleToggle}>
      <span
        css={[styles.toggleSpan, isOpen && styles.toggleSpan1Collapsed]}
      ></span>
      <span
        css={[styles.toggleSpan, isOpen && styles.toggleSpan2Collapsed]}
      ></span>
      <span
        css={[styles.toggleSpan, isOpen && styles.toggleSpan3Collapsed]}
      ></span>
    </button>
  );
};
