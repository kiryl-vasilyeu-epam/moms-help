import { css } from '../styled-system/css'

export const styles = {
  root: css({
    w: '100%',
    h: '100vh',
    m: '0',
    p: '0',
    display: 'flex',
    placeItems: 'center',
    minW: '320px',
    minH: '100vh',
  }),

  container: css({
    maxW: '1280px',
    mx: 'auto',
    px: '2rem',
    py: '2rem',
    textAlign: 'center',
  }),
  
  logoContainer: css({
    display: 'flex',
    gap: '2rem',
    mb: '2rem',
    justifyContent: 'center',
  }),
  
  logo: css({
    h: '6em',
    p: '1.5em',
    willChange: 'filter',
    transition: 'filter 300ms',
    
    _hover: {
      filter: 'drop-shadow(0 0 2em #646cffaa)',
    },
  }),
  
  logoReact: css({
    _hover: {
      filter: 'drop-shadow(0 0 2em #61dafbaa)',
    },
  }),
  
  heading: css({
    fontSize: '3.2em',
    lineHeight: '1.1',
    mb: '1rem',
  }),
  
  card: css({
    p: '2em',
  }),
  
  button: css({
    borderRadius: '8px',
    border: '1px solid transparent',
    px: '1.2em',
    py: '0.6em',
    fontSize: '1em',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'border-color 0.25s',
    bg: '#bebebe',

    _hover: {
      borderColor: '#646cff',
    },

    _focus: {
      outline: '4px auto -webkit-focus-ring-color',
    },
  }),
  
  docs: css({
    color: '#888',
  }),
}