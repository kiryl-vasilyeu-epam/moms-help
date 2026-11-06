import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing, colors }) => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing.lg,
  },
  footer: {
    position: 'sticky',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `${spacing.base} 0`,
    background: colors.white,
    borderTop: `1px solid ${colors.border}`,
  },
  saveButton: {
    minWidth: '240px',
  },
}));
