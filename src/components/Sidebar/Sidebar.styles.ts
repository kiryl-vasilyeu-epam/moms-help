import { createStyles } from '@utils'

export const styles = createStyles(({ sizes }) => ({
  sidebar: {
    position: 'absolute',
    left: 0,
    zIndex: 1000,
    width: 280,
    height: '100vh',
    background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    color: 'white',

    overflowY: 'auto',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
    transition: 'width .3s ease',
  },
  collapsedSidebar: {
    width: sizes.sidebarWidth
  },

  header: {
    padding: '0 15px',
    borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
  },

  headerTitle: {
    fontSize: '24px',
    fontWeight: 600,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  collapsedText: {
    opacity: 0,
  },
}))
