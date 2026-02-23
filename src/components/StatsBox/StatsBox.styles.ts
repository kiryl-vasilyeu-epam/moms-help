import { createStyles } from "@utils";

export const styles = createStyles({
  statBox: {
    flex: 1,
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    borderRadius: "8px",
    textAlign: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
  },
  statBoxLabel: {
    fontSize: "14px",
    opacity: 0.9,
  },
  statBoxAmount: {
    fontSize: "28px",
    fontWeight: "bold",
  },
});
