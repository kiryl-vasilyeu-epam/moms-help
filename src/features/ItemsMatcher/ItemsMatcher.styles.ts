import { createStyles } from "@utils";

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
  uploadSection: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
  },
  buttonRow: {
    display: "flex",
    width: "100%",
    maxWidth: "800px",
    gap: "10px",
  },
  processButton: {
    flex: 1,
  },
  results: {
    width: "100%",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },
  filterButtons: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
});