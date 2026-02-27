import { createStyles } from "@utils";

export const styles = createStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "400px",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  searchField: {
    flex: 1,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    height: "300px",
    overflowY: "auto",
  },
  listItem: {
    display: "flex",
    padding: "8px",
    minHeight: "40px",
    height: "40px",
    alignItems: "center",
    cursor: "pointer",
    borderBottom: "1px solid #c1c1c1",
    "&:hover": {
      background: "#e1edff",
    },
  },
  listItemEven: {
    background: "#f9f9f9",
  }
});
