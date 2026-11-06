import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(
  ({ spacing, colors, radii, shadows, sizes }) => ({
    container: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      maxWidth: sizes.maxContentWidth,
      margin: '0 auto',
      background: colors.white,
      borderRadius: radii.lg,
      boxShadow: shadows.xxl,
      padding: spacing.xxl,
      gap: spacing.lg,
      minHeight: '80vh',
    },
    header: {
      alignSelf: 'flex-start',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      width: '100%',
      gap: spacing.base,
      marginBottom: spacing.base,
    },
    uploadState: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.lg,
      width: '100%',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: spacing.base,
    },
    fileButton: {
      padding: `${spacing.sm} ${spacing.lg}`,
    },
    modal: {
      padding: `${spacing.lg} !important`,
      display: 'flex',
      width: 'min(900px, 90vw)',
      height: '70vh',
    },
    modalTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: `1px solid ${colors.border}`,
      fontWeight: 'bold',
    },
    modalContainer: {
      background: colors.backgroundAlt,
    },
  }),
);
