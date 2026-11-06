import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ colors, radii, spacing, transitions, fontSizes }) => ({
    uploadBox: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
      gap: spacing.xs,
      border: `2px dashed ${colors.borderHover}`,
      borderRadius: radii.lg,
      padding: `${spacing.xl} ${spacing.lg}`,
      textAlign: 'center',
      background: colors.background,
      cursor: 'pointer',
      transition: `all ${transitions.base}`,

      '&:hover': {
        background: colors.backgroundHover,
        borderColor: colors.primary,
      },
    },
    dragging: {
      background: colors.backgroundBlueHover,
      borderColor: colors.primary,
      borderStyle: 'solid',
    },
    loadedFileBox: {
      background: colors.successLight,
      borderColor: colors.successBorder,
      borderStyle: 'solid',
      '&:hover': {
        background: colors.successLight,
        borderColor: colors.success,
      },
    },
    icon: {
      fontSize: '44px',
      color: colors.primary,
    },
    loadedIcon: {
      color: colors.success,
    },
    uploadBoxH3: {
      color: colors.text,
      fontSize: fontSizes.lg,
    },
    hint: {
      color: colors.textMuted,
    },
    fileInput: {
      display: 'none',
    },
    fileLabel: {
      display: 'inline-block',
      marginTop: spacing.xs,
      padding: `${spacing.xs} ${spacing.lg}`,
      background: colors.white,
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
      borderRadius: radii.lg,
      fontWeight: 600,
    },
    fileName: {
      color: colors.textSecondary,
      fontSize: fontSizes.sm,
      wordBreak: 'break-all',
    },
    loadedFileName: {
      color: colors.success,
      fontWeight: 'bold',
    },
  }),
);
