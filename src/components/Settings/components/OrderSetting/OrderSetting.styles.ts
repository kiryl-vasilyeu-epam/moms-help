import { createStyles } from '@utils';

export const styles = createStyles(
  ({ spacing, fontSizes, radii, transitions }) => ({
    settingLabel: {
      fontSize: fontSizes.lg,
    },
    orderContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.xs,
      width: '100%',
      marginTop: spacing.xs,
    },
    orderItem: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `${spacing.sm} ${spacing.md}`,
      background: 'rgba(255, 255, 255, 0.08)',
      borderRadius: radii.base,
      transition: `background ${transitions.fast}`,
      position: 'relative',
      '&:hover': {
        background: 'rgba(255, 255, 255, 0.12)',
      },
    },
    orderItemLabel: {
      fontSize: fontSizes.xl,
    },
    orderItemInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: spacing.lg,
      flex: 1,
    },
    orderControls: {
      display: 'flex',
      gap: spacing.xxs,
    },
    orderButtonIcon: {
      fontSize: '50px',
    },
    orderSettingWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
  }),
);
