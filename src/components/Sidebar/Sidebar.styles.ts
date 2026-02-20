import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  drawer: {
    width: 280,
    flexShrink: 0,
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
