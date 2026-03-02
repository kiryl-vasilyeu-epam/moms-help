import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ fontSizes, colors }) => ({
  base: {
    margin: 0,
    padding: 0,
  },
  bold: {
    fontWeight: 'bold',
  },
  // Variants
  h1: {
    fontSize: fontSizes.xxxl,
    fontWeight: 600,
  },
  h2: {
    fontSize: fontSizes.xxl,
    fontWeight: 600,
  },
  h3: {
    fontSize: fontSizes.xl,
    fontWeight: 600,
  },
  h4: {
    fontSize: fontSizes.lg,
    fontWeight: 600,
  },
  h5: {
    fontSize: fontSizes.base,
    fontWeight: 600,
  },
  h6: {
    fontSize: fontSizes.sm,
    fontWeight: 600,
  },
  body: {
    fontSize: fontSizes.base,
  },
  bodySmall: {
    fontSize: fontSizes.sm,
  },
  caption: {
    fontSize: fontSizes.xs,
  },
  label: {
    fontSize: fontSizes.sm,
  },
  // Colors
  colorPrimary: {
    color: colors.text,
  },
  colorSecondary: {
    color: colors.textSecondary,
  },
  colorMuted: {
    color: colors.textMuted,
  },
  colorWhite: {
    color: colors.white,
  },
  colorSuccess: {
    color: colors.success,
  },
  colorDanger: {
    color: colors.danger,
  },
  colorWarning: {
    color: colors.warningDark,
  },
  colorInfo: {
    color: colors.info,
  },
}));
