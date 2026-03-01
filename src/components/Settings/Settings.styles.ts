import { createStyles } from '@utils';

export const styles = createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    padding: '16px',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '12px',
    padding: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    paddingBottom: '8px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #95979f',
  },
  settingLabel: {
    fontSize: '14px',
  },
  // Input styles
  input: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.1)',
    minWidth: '200px',
    transition: 'border-color 0.2s',
    borderColor: '#2b2e3a',
    '&:focus': {
      outline: 'none',
      borderColor: '#667eea',
    },
    '&::placeholder': {
      color: 'grey',
    },
  },
  // Toggle styles
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
  // Order styles
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
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.12)',
    },
  },
  orderItemLabel: {
    fontSize: '14px',
  },
  orderControls: {
    display: 'flex',
    gap: '4px',
  },
  orderButton: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background 0.2s, opacity 0.2s',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.2)',
    },
    '&:disabled': {
      opacity: 0.3,
      cursor: 'not-allowed',
    },
  },
  orderSettingWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});
