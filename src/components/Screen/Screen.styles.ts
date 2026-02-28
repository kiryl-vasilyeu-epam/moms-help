import { createStyles } from "@utils";

export const styles = createStyles({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
    padding: "30px",
    gap: "20px",
    minHeight: "80vh",
  },
  header: {
    alignSelf: "flex-start",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginBottom: "40px",
  },
  uploadState: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
  },
  uploadIcon: {
    fontSize: "40px",
    color: "#764ba2",
    cursor: "pointer",
  },
  modal: {
    padding: "50px",
  },
  closeModalButton: {
    position: "absolute",
    right: "8px",
    top: "8px",
  },
});
