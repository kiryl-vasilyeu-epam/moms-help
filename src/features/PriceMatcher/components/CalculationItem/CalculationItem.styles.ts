import { createSxStyles } from '@utils';

export const styles = createSxStyles(
  ({ spacing, colors, radii, shadows, fontSizes, transitions }) => ({
    card: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing.md,
      padding: spacing.base,
      border: `1px solid ${colors.border}`,
      borderLeftWidth: spacing.xs,
      borderLeftColor: colors.success,
      borderRadius: radii.base,
      backgroundColor: colors.white,
      boxShadow: shadows.sm,
      cursor: 'pointer',
      transition: transitions.fast,
      '&:hover': {
        transform: 'translateY(-2px)',
        borderColor: colors.borderHover,
      },
    },
    cardOffTarget: {
      borderColor: colors.warningDark,
      borderLeftColor: colors.warningDark,
      backgroundColor: colors.warningLight,
    },
    cardNoSolution: {
      borderLeftColor: colors.danger,
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontWeight: 'bold',
      fontSize: fontSizes.xl,
      gap: spacing.lg,
    },
    title: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '5px',
      flexDirection: 'column',
    },

    solutionSection: {
      padding: `0px ${spacing.md}`,
    },
    solutionTitle: {
      fontSize: '0.95rem',
      fontWeight: 'bold',
    },
    items: {
      fontSize: '0.9rem',
    },
    itemLi: {
      padding: `${spacing.md} 0`,
      wordBreak: 'break-word',
      borderBottom: `1px solid ${colors.borderDark}`,
    },
    total: {
      marginTop: spacing.sm,
      fontWeight: 'bold',
      fontSize: '0.95rem',
    },
    noSolution: {
      alignSelf: 'flex-start',
      borderRadius: radii.base,
      padding: spacing.lg,
      fontStyle: 'italic',
      backgroundColor: colors.dangerLight,
    },
    offTargetLabel: {},
    targetLabel: {
      marginLeft: spacing.sm,
    },
  }),
);
