import { createStyles } from '@utils';

export const styles = createStyles({
  settingLabel: {
    fontSize: '18px',
  },
  orderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    marginTop: '8px',
  },
  orderItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 12px',
    background: 'rgba(255, 255, 255, 0.08)',
    borderRadius: '8px',
    transition: 'background 0.2s',
    position: 'relative',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.12)',
    },
  },
  orderItemLabel: {
    fontSize: '20px',
  },
  orderItemInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flex: 1,
  },
  orderControls: {
    display: 'flex',
    gap: '4px',
  },
  orderButtonIcon: {
    fontSize: '50px',
  },
  orderSettingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});
