import type { HamburgerButtonProps } from './HamburgerButton.types'
import { styles } from './HamburgerButton.styles'

export const HamburgerButton = ({ handleToggle, isOpen }: HamburgerButtonProps) => {
  return (
    <button css={styles.toggle} onClick={handleToggle}>
      <span css={[styles.toggleSpan, isOpen && styles.toggleSpan1Collapsed]}></span>
      <span css={[styles.toggleSpan, isOpen && styles.toggleSpan2Collapsed]}></span>
      <span css={[styles.toggleSpan, isOpen && styles.toggleSpan3Collapsed]}></span>
    </button>
  )
}
