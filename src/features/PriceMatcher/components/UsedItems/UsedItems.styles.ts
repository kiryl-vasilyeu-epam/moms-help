import { createSxStyles } from '@utils';

export const styles = createSxStyles({
  container: {
    alignSelf: 'center',
    flexDirection: 'column',
    display: 'flex',
    overflowY: 'auto',
    gap: '20px',
    paddingTop: '20px !important',
  },
  modalTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #ddd',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.44)',
    fontSize: '18px',
    fontWeight: 'bold',
  },

  item: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.61)',
  },
});
