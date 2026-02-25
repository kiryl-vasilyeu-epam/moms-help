import { StrictCssObjectWithSelectors } from "@utils";
import { ReactNode } from "react";

export interface ListRowProps {
    children: ReactNode;
    height?: number;
    variant?: 'header' | 'row';
    style?:  (StrictCssObjectWithSelectors | null | undefined)[]
}
