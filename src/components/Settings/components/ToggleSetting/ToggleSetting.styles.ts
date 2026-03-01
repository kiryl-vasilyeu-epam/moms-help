import { createStyles } from '@utils';

export const styles = createStyles({
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderBottom: '1px solid #95979f',
    gap: '16px',
  },
  settingLabel: {
    fontSize: '18px',
  },
  toggle: {
    position: 'relative',
    width: '48px',
    height: '26px',
    borderRadius: '13px',
    background: 'rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  toggleActive: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  toggleKnob: {
    position: 'absolute',
    top: '3px',
    left: '3px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#fff',
    transition: 'transform 0.2s',
  },
  toggleKnobActive: {
    transform: 'translateX(22px)',
  },
});
