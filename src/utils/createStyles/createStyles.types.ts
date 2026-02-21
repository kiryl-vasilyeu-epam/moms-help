import { SystemStyleObject } from "styled-system/types";

type Styles = SystemStyleObject | undefined | null | false

export type StyleObject = Record<string, Styles>;
export type StyleResult = Record<string, string>;
