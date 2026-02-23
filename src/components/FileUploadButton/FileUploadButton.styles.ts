import { createStyles } from "@utils";

export const styles = createStyles({
  uploadBox: {
    flex: 1,
    border: "2px dashed #667eea",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    background: "#f8f9ff",
    transition: "all 0.3s",

    "&:hover": {
      background: "#eef1ff",
      borderColor: "#764ba2",
    },
  },
  loadedFileBox: {
    background: "#d4edda",
    borderColor: "#28a745",
  },
  uploadBoxH3: {
    color: "#667eea",
    marginBottom: "15px",
  },
  loadedH3: {
    color: "#28a745",
  },
  fileInput: {
    display: "none",
  },
  fileLabel: {
    display: "inline-block",
    padding: "10px 20px",
    background: "#667eea",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
    "&:hover": {
      background: "#764ba2",
    },
  },
  fileName: {
    marginTop: "10px",
    color: "#666",
    fontSize: "14px",
  },
});