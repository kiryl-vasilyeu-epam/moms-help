import { createStyles, createSxStyles } from '@utils'

export const styles = createStyles({
  sidebar: {
    width: '280px',
    height: '100px',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    color: 'white',
    overflowY: 'auto',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
    transition: 'width 0.3s ease, margin-left 0.3s ease',
    '&.collapsed': { width: '80px' },
  },

  header: {
    padding: '30px 20px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '&.collapsed': { padding: '20px 10px' },
  },

  headerTitle: {
    fontSize: '24px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&.collapsed': { display: 'none' },
  },

  toggle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    color: 'white',
  },

  toggleSpan: {
    width: '24px',
    height: '2px',
    background: 'white',
    borderRadius: '2px',
    transition: 'all 0.3s ease',
  },

  toggleSpan1Collapsed: {
    transform: 'rotate(45deg) translate(8px, 8px)',
  },

  toggleSpan2Collapsed: {
    opacity: 0,
  },

  toggleSpan3Collapsed: {
    transform: 'rotate(-45deg) translate(7px, -7px)',
  },

  menu: {
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    '&.collapsed': { padding: '10px 0' },
  },

  menuItem: {
    padding: '18px 20px',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'left',
    transition: 'all 0.3s',
    borderLeft: '4px solid transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
    },
  },

  menuIcon: {
    fontSize: '18px',
    flexShrink: 0,
  },

  menuItemActive: {
    background: 'rgba(255, 255, 255, 0.15)',
    color: 'white',
    borderLeftColor: '#3498db',
  },

  menuText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&.collapsed': { display: 'none' },
  },

  appContent: {
    flex: 1,
    overflow: 'hidden',
    transition: 'margin-left 0.3s ease',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    backgroundAttachment: 'fixed',
  },

  appIframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
})

export const stylesSx = createSxStyles({
  drawer: {
    width: 280,
    '& .MuiDrawer-paper': {
      width: 280,
      boxSizing: 'border-box',
      background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      color: 'white',
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
    },
  },

  header: {
    p: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
  },

  title: {
    fontWeight: 600,
  },

  closeButton: {
    color: 'white',
  },

  menuItemButton: (isActive: boolean) => ({
    borderRadius: 1,
    mb: 1,
    background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
    },
    borderLeft: isActive ? '4px solid white' : 'none',
    pl: isActive ? '12px' : '16px',
  }),

  menuIcon: {
    color: 'white',
    minWidth: 40,
  },
})
