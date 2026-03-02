import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(({ spacing, sizes }) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: spacing.lg,
    maxWidth: sizes.maxUploadWidth,
  },
  uploadSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: spacing.lg,
  },
}));
