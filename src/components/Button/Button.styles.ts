import { createStyles } from "@utils";

export const styles = createStyles({
  button: {
    padding: "15px",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.02)",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
      transform: "none",
    },
  },
  buttonPrimary: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  buttonSuccess: {
    background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
    display: "block",
    width: "100%",
    boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)",
  },
  buttonInfo: {
    background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
    display: "block",
    width: "100%",
    boxShadow: "0 4px 12px rgba(52, 152, 219, 0.3)",
  },
  buttonDanger: {
    background: "#e74c3c",
    width: "50px",
    height: "50px",
    padding: 0,
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

  },
});
