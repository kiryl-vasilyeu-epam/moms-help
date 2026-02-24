import { createStyles } from "@utils";

export const styles = createStyles({
  matchedInvno: {
    cursor: "default",
    position: "relative",
  },
  matchedInvnoHasTooltipPink: {
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
  },
});