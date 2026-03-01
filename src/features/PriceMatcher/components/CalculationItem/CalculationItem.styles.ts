import { createSxStyles } from '@utils';

export const styles = createSxStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    border: '1px solid #ddd',
    borderLeftWidth: '8px',
    borderLeftColor: '#4caf50',
    borderRadius: '8px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: '0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      borderColor: '#95adff',
    },
  },
  cardOffTarget: {
    borderColor: '#ff9800',
    borderLeftColor: '#ff9800',
    backgroundColor: '#fff3e0',
  },
  cardNoSolution: {
    borderLeftColor: '#ff0400',
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
    gap: '20px',
  },
  title: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '5px',
    flexDirection: 'column',
  },

  solutionSection: {
    padding: '0px 12px',
  },
  solutionTitle: {
    fontSize: '0.95rem',
    fontWeight: 'bold',
    color: '#333',
  },
  items: {
    fontSize: '0.9rem',
  },
  itemLi: {
    padding: '6px 0',
    wordBreak: 'break-word',
    borderBottom: '1px solid #bcbbbb',
  },
  total: {
    marginTop: '10px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '0.95rem',
  },
  noSolution: {
    alignSelf: 'flex-start',
    borderRadius: '8px',
    padding: '20px',
    color: '#dc3545',
    fontStyle: 'italic',
    backgroundColor: '#f8d7da',
  },
  offTargetLabel: {
    color: '#ff9800',
  },
  targetLabel: {
    marginLeft: '10px',
  },
});
