import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  container: {
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    backgroundAttachment: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  content: {
    textAlign: 'center',
    color: 'white',
  },

  title: {
    fontWeight: 'bold',
    mb: 1,
  },

  subtitle: {
    opacity: 0.9,
  },
})
