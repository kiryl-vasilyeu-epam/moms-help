import { createStyles } from "@utils";

export const styles = createStyles({
  row: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    borderBottom: "1px solid #ddd",
  },
  header: {
    background: "#667eea",
    color: "white",
    fontWeight: 600,
  },
  even: {
    background: "#efefef",
  }
});