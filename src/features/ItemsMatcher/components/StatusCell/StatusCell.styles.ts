import { createStyles } from "@utils";

export const styles = createStyles({
  matchStatus: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  noMatch: {
    color: "#e74c3c",
    fontWeight: "bold",
    fontSize: "20px",
  },
  match: {
    color: "#27ae60",
    fontSize: "20px",
    fontWeight: "bold",
  },
  fuzzyMatch: {
    color: "#f39c12",
    fontWeight: "bold",
    fontSize: "20px",
  },
  manualMatch: {
    color: "#2196f3",
    fontWeight: "bold",
    fontSize: "20px",
  },
});