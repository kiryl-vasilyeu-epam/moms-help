import { theme } from "@/styles"
import { CSSObject } from '@emotion/react'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
    ? never
    : symbol extends K
    ? never
    : K]: T[K];
};

type SpecialSelector = `${"&" | ":" | "@"}${string}`;

export type StrictCssObject = RemoveIndexSignature<CSSObject>
export type StrictCssObjectWithSelectors = StrictCssObject & Record<SpecialSelector, StrictCssObject> 
export type StylesMap = Record<string, StrictCssObjectWithSelectors>


export type Theme = typeof theme