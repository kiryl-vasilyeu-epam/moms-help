import { createStyles } from '@utils'

export const styles = createStyles({
  toggle: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    padding: 15,
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
})
