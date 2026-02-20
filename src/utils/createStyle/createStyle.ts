import { css } from '../../../styled-system/css'
import type { StyleObject, StyleResult } from './createStyle.types'

/**
 * Creates typed style classes using Panda CSS
 * @param styles Object with style definitions
 * @returns Object with className strings
 * 
 * @example
 * const styles = createStyle({
 *   container: { padding: '2rem', maxWidth: '1280px' },
 *   button: { padding: '0.6em 1.2em', cursor: 'pointer' }
 * })
 * 
 * // Usage:
 * <div className={styles.container}>...</div>
 */
export const createStyle = (styles: StyleObject): StyleResult => {
  const result: StyleResult = {}

  for (const [key, value] of Object.entries(styles)) {
    // Wrap each style definition in Panda's css() function
    result[key] = css(value)
  }

  return result
}

/**
 * Combines multiple class strings
 * @param classes Array of class names
 * @returns Combined class string
 * 
 * @example
 * cn(styles.button, styles.primary) // "css_1a2b css_2c3d"
 */
export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}
