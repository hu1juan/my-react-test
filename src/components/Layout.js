import React, { useEffect } from "react";
import {
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  OutlinedInput,
  Grid,
  Backdrop,
  IconButton,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import EmailIcon from "@material-ui/icons/Email";
import FlagIcon from "@material-ui/icons/Flag";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import ReportProblemOutlinedIcon from "@material-ui/icons/ReportProblemOutlined";
import Badge from "@material-ui/core/Badge";
import useStyles from "./Layout.styles";
import { STATIC_DATA } from "../constant";

const Layout = () => {
  const classes = useStyles();
  const [dataSource, set_dataSource] = React.useState([]);
  const [activeFolder, set_activeFolder] = React.useState(1);
  const [loading, set_loading] = React.useState(false);
  const [searchText, set_searchText] = React.useState("");
  const [onSearch, set_onSearch] = React.useState(false);
  const [expanded, set_expanded] = React.useState(true);

  useEffect(() => {
    // init and randomize unread messages

    const init = STATIC_DATA.map((item) => ({
      ...item,
      active: Math.floor(Math.random() * 2),
    }));
    set_dataSource(init);
  }, []);

  const getCounter = (folderId) => {
    // return unread messages count based on respective folders

    return dataSource.filter((el) => el.folderId === folderId && el.active)
      .length;
  };

  const handleAction = (item, folderId) => {
    // handle action like flag, spam, delete

    set_loading(true);
    const undo_action = item.folderId === folderId;
    if (undo_action) {
      const index = dataSource.findIndex((data) => data.id === item.id);
      const data = {
        ...item,
        folderId: 1,
      };
      const new_dataSource = [...dataSource];
      new_dataSource.splice(index, 1, data);
      setTimeout(() => {
        set_loading(false);
        set_dataSource(new_dataSource);
      }, 800);
    } else {
      const index = dataSource.findIndex((data) => data.id === item.id);
      const data = {
        ...item,
        folderId,
      };
      const new_dataSource = [...dataSource];
      new_dataSource.splice(index, 1, data);
      setTimeout(() => {
        set_loading(false);
        set_dataSource(new_dataSource);
      }, 800);
    }
  };

  const handleRead = (item) => {
    // handle read action

    set_loading(true);
    const index = dataSource.findIndex((data) => data.id === item.id);
    const data = {
      ...item,
      active: 0,
    };
    const new_dataSource = [...dataSource];
    new_dataSource.splice(index, 1, data);
    setTimeout(() => {
      set_loading(false);
      set_dataSource(new_dataSource);
    }, 800);
  };

  const myFolders = [
    {
      text: "Inbox",
      icon: <EmailIcon />,
      counter: getCounter(1),
      folderId: 1,
    },
    {
      text: "Flagged",
      icon: <FlagIcon />,
      counter: getCounter(2),
      folderId: 2,
    },
    {
      text: "Spam",
      icon: <ReportProblemIcon />,
      counter: getCounter(3),
      folderId: 3,
    },
    {
      text: "Deleted",
      icon: <DeleteIcon />,
      counter: getCounter(4),
      folderId: 4,
    },
  ];

  return (
    <div className={classes.container}>
      <Drawer
        className={expanded ? classes.drawer : classes.smDrawer}
        classes={{ paper: expanded ? classes.drawPaper : classes.smDrawPaper }}
        variant="permanent"
        anchor="left"
      >
        <div style={{ textAlign: expanded ? "right" : "center" }}>
          <IconButton onClick={() => set_expanded(!expanded)}>
            <MenuIcon className={classes.burgerMenu} />
          </IconButton>
        </div>
        <List>
          {myFolders.map((item) => (
            <ListItem
              key={item.folderId}
              selected={activeFolder === item.folderId}
              onClick={() => set_activeFolder(item.folderId)}
              className={classes.folder}
            >
              {expanded ? (
                <React.Fragment>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.counter ? (
                    <Typography
                      edge="end"
                      className={classes.counter}
                      variant="caption"
                    >
                      {item.counter}
                    </Typography>
                  ) : null}
                </React.Fragment>
              ) : (
                <Badge badgeContent={item.counter} color="primary">
                  {item.icon}
                </Badge>
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <OutlinedInput
              placeholder="Search here..."
              value={searchText}
              onChange={(e) => {
                if (!e.target.value) {
                  set_onSearch(false);
                }
                set_searchText(e.target.value);
              }}
              fullWidth
              endAdornment={[
                <IconButton
                  key="search"
                  onClick={() =>
                    searchText ? set_onSearch(true) : set_onSearch(false)
                  }
                >
                  <SearchIcon />
                </IconButton>,
                <IconButton
                  key="close"
                  onClick={() => {
                    set_onSearch(false);
                    set_searchText("");
                  }}
                >
                  <CloseIcon />
                </IconButton>,
              ]}
            />
          </Grid>
          <div className={classes.messageContainer}>
            {dataSource
              .filter((data) =>
                activeFolder === 1
                  ? data.folderId !== 4 &&
                    (onSearch
                      ? data["body"]
                          .toLowerCase()
                          .indexOf(searchText.toLowerCase()) !== -1
                      : true)
                  : data.folderId === activeFolder
              )
              .map((item) => (
                <Grid
                  item
                  xs={12}
                  key={item.id}
                  className={`${classes.borderHighlight} ${
                    item.active ? classes.unreadHighlight : ""
                  }`}
                >
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={8}
                      onClick={() => handleRead(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <Typography
                        variant={item.active ? "subtitle2" : "body2"}
                        className={classes.ellipsis}
                      >
                        {item.body}
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.displayFlex}
                      >
                        <ChatBubbleOutlineIcon fontSize={"small"} />
                        {item.email}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{ cursor: "pointer", paddingRight: 15 }}
                    >
                      <Typography align="right">
                        <span>
                          {item.active ? (
                            <Typography
                              className={classes.counter}
                              variant="caption"
                            >
                              new
                            </Typography>
                          ) : null}
                          <Typography variant="caption">
                            &emsp;06/08/2021
                          </Typography>
                        </span>
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.displayFlex}
                        style={{ justifyContent: "flex-end" }}
                        align="right"
                      >
                        {item.folderId === 3 ? (
                          <ReportProblemIcon
                            fontSize={"small"}
                            className={classes.activeIcon}
                            onClick={() => handleAction(item, 3)}
                          />
                        ) : (
                          <ReportProblemOutlinedIcon
                            fontSize={"small"}
                            className={classes.icon}
                            onClick={() => handleAction(item, 3)}
                          />
                        )}
                        &nbsp;
                        {item.folderId === 4 ? (
                          <DeleteIcon
                            fontSize={"small"}
                            className={classes.activeIcon}
                            onClick={() => handleAction(item, 4)}
                          />
                        ) : (
                          <DeleteOutlinedIcon
                            fontSize={"small"}
                            className={classes.icon}
                            onClick={() => handleAction(item, 4)}
                          />
                        )}
                        &nbsp;
                        {item.folderId === 2 ? (
                          <FlagIcon
                            fontSize={"small"}
                            className={classes.activeIcon}
                            onClick={() => handleAction(item, 2)}
                          />
                        ) : (
                          <FlagOutlinedIcon
                            fontSize={"small"}
                            className={classes.icon}
                            onClick={() => handleAction(item, 2)}
                          />
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </div>

          <Backdrop open={loading}>
            <CircularProgress color="primary" />
          </Backdrop>
        </Grid>
      </div>
    </div>
  );
};

export default Layout;
