import { createStyles } from "@utils"

export const styles = createStyles({
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
      background: "#eeeff6",
    },
  },

  activeButton : {
    background: "#667eea",
    color: "white",
    "&:hover": {
      background: "#667eea",
    },
  },
})
