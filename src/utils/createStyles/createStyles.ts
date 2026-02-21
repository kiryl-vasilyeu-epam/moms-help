import { css } from '../../../styled-system/css'
import type { StyleObject, StyleResult } from './createStyles.types'

export const createStyles = (styles: StyleObject): StyleResult => {
  const result: StyleResult = {}

  for (const [key, value] of Object.entries(styles)) {
    // Wrap each style definition in Panda's css() function
    result[key] = css(value)
  }

  return result
}

export const cn = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}
