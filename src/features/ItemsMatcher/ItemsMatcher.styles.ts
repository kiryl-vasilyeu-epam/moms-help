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
    gap: "10px",
  },
  processButton: {
    flex: 1,
  },
  results: {
    marginTop: "30px",
  },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "20px",
  },
  statBox: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  statBoxH4: {
    fontSize: "14px",
    opacity: 0.9,
    marginBottom: "5px",
  },
  statBoxP: {
    fontSize: "28px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    background: "white",
  },
  tableHeader: {
    padding: "12px",
    textAlign: "left",
    background: "#667eea",
    color: "white",
    fontWeight: 600,
    borderBottom: "1px solid #ddd",
    borderRight: "1px solid #f0f0f0",
  },
  filterButtons: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterBtn: {
    padding: "10px 20px",
    border: "2px solid #667eea",
    background: "white",
    color: "#667eea",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: 600,
    transition: "all 0.3s",
    "&:hover": {
      background: "#f8f9ff",
    },
    "&.active": {
      background: "#667eea",
      color: "white",
    },
  },
});