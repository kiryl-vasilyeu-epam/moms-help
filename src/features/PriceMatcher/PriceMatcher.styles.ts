import { createStyles } from '@utils';

export const styles = createStyles({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    padding: "30px",
    gap: "20px",
  },

  controls: {
    width: 600,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  }
});
