import { createStyles } from "@utils";

export const styles = createStyles({
  matchedInvNo: {
    cursor: "default",
    position: "relative",
  },
  matchedInvNoFuzzy: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    borderRadius: 8,
    border: "2px solid #ff9800",
    background: "#fff3e0",
    '&:hover': {
      background: "#ffe0b2",
    },
    cursor: 'pointer'
  },
  matchedInvNoNone: {
    flex: 1,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    borderRadius: 8,
    border: "2px dashed #667eea",
    '&:hover': {
      background: "#f0f4ff",
    },
    cursor: 'pointer'
  }
});