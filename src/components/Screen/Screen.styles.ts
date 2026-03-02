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
      marginBottom: '40px',
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
    uploadIcon: {
      fontSize: sizes.iconMd,
      color: colors.primaryDark,
      cursor: 'pointer',
    },
    modal: {
      padding: spacing.lg,
      paddingTop: sizes.buttonClose,
      display: 'flex',
      width: '70vw',
      height: '70vh',
    },
    closeModalButton: {
      position: 'absolute',
      right: spacing.xs,
      top: spacing.xs,
    },
  }),
);
