import { createSxStyles } from '@utils';

export const styles = createSxStyles({
  container: {
    alignSelf: 'center',
    flexDirection: 'column',
    display: 'flex',
    overflowY: 'auto',
    gap: '20px',
    paddingTop: '20px !important',
    backgroundColor: '#befbdc',
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
    borderRadius: '4px',
  },
});
