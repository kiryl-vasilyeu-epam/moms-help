import { createStyleSheet } from '@utils';

export const stylesheet = createStyleSheet(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  },
  back: {
    width: 300,
    alignSelf: 'center',
  },
}));
