import type { SxStylesRecord } from './createSxStyles.types'

export const createSxStyles = <T extends SxStylesRecord>(styles: T): T => {
  return styles as T
}
