import { StrictCssObjectWithSelectors } from '@utils/createStyles/createStyles.types'
import { ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'success' | 'info' | 'danger'

export interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  onClick?: () => void
  title?: string
  isSmall?: boolean
  style?: StrictCssObjectWithSelectors
}
