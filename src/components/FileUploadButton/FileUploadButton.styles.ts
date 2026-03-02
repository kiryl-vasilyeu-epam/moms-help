import { createStyles } from '@utils';

export const styles = createStyles(
  ({ colors, radii, spacing, transitions }) => ({
    uploadBox: {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      border: `2px dashed ${colors.primary}`,
      borderRadius: radii.base,
      padding: spacing.lg,
      textAlign: 'center',
      background: colors.background,
      transition: `all ${transitions.base}`,

      '&:hover': {
        background: colors.backgroundHover,
        borderColor: colors.primaryDark,
      },
    },
    loadedFileBox: {
      background: colors.successLight,
      borderColor: colors.successBorder,
    },
    uploadBoxH3: {
      flex: 1,
      color: colors.primary,
      marginBottom: '15px',
    },
    loadedH3: {
      color: colors.successBorder,
    },
    fileInput: {
      display: 'none',
    },
    fileLabel: {
      display: 'inline-block',
      padding: '10px 20px',
      background: colors.primary,
      color: colors.white,
      borderRadius: radii.md,
      cursor: 'pointer',
      transition: `background ${transitions.base}`,
      '&:hover': {
        background: colors.primaryDark,
      },
    },
    fileName: {
      marginTop: spacing.sm,
      color: colors.textSecondary,
      fontSize: '14px',
    },
  }),
);
