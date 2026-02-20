import type { SxProps, Theme } from '@mui/material'

export type SxStylesRecord = Record<string, SxProps<Theme> | ((props: any) => SxProps<Theme>)>

export type SxStylesResult<T extends SxStylesRecord> = T & { __sx: true }
