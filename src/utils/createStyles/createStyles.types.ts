import { theme } from '@/styles';
import type { CSSObject } from '@emotion/react';
import type { SxProps, Theme as MuiTheme } from '@mui/material';

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K];
};

type SpecialSelector = `${'&' | ':' | '@'}${string}`;

export type StrictCssObject = RemoveIndexSignature<CSSObject>;
export type StrictCssObjectWithSelectors = StrictCssObject &
  Record<SpecialSelector, StrictCssObject>;
export type StylesMap = Record<string, StrictCssObjectWithSelectors>;

export type SxStylesMap = Record<string, SxProps<MuiTheme>>;

export type Theme = typeof theme;
