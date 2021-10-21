import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  drawer: {
    width: 200,
  },
  smDrawer: {
    width: 75,
  },
  drawPaper: {
    width: 200,
  },
  smDrawPaper: {
    width: 70,
  },
  burgerMenu: {
    cursor: "pointer",
    float: "right",
    padding: "10px 5px 0px",
  },
  counter: {
    padding: "0px 5px",
    backgroundColor: "#3f51b5",
    color: "white",
    borderRadius: 5,
  },
  content: {
    width: "100%",
    padding: 10,
    overflow: "hidden",
  },
  borderHighlight: {
    borderLeft: "5px solid orange",
    paddingBottom: 5,
    marginBottom: 5,
    paddingLeft: 5,
  },
  unreadHighlight: {
    backgroundColor: "rgba(0, 0, 0, 0.08)",
  },
  messageContainer: {
    overflow: "auto",
    marginTop: 15,
  },
  displayFlex: {
    display: "flex",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  ellipsis: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  folder: {
    cursor: "pointer",
    "&:hover": {
      borderLeft: "5px solid #3f51b5",
    },
  },
  icon: {
    "&:hover": {
      color: "#3f51b5",
    },
  },
  activeIcon: {
    color: "#3f51b5",
  },
});

export default useStyles;
