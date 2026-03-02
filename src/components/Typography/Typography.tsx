import type { ElementType } from 'react';
import { stylesheet } from './Typography.styles';
import type { TypographyProps, TypographyVariant } from './Typography.types';
import { useStyles } from '@hooks';

const variantToElement: Record<TypographyVariant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  bodySmall: 'p',
  caption: 'span',
  label: 'span',
};

export const Typography = ({
  children,
  variant = 'body',
  color = 'primary',
  bold = false,
  className,
  style,
}: TypographyProps) => {
  const styles = useStyles(stylesheet);
  const Element = variantToElement[variant];

  const colorStyle = {
    primary: styles.colorPrimary,
    secondary: styles.colorSecondary,
    muted: styles.colorMuted,
    white: styles.colorWhite,
    alwaysWhite: styles.colorAlwaysWhite,
    success: styles.colorSuccess,
    danger: styles.colorDanger,
    warning: styles.colorWarning,
    info: styles.colorInfo,
  }[color];

  return (
    <Element
      css={[
        styles.base,
        styles[variant],
        colorStyle,
        bold && styles.bold,
        style,
      ]}
      className={className}
    >
      {children}
    </Element>
  );
};
