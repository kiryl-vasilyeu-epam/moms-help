import { createStyles } from '@utils'

export const styles = createStyles({
  collapsedText: {
    opacity: 0,
  },

  menuItem: {
    padding: '18px 30px',
    border: 'none',
    background: 'transparent',
    color: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: 500,
    textAlign: 'left',
    transition: 'all 0.3s',
    borderLeft: '5px solid transparent',
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
  },
})
