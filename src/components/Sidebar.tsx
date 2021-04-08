// Modules Imported For Use
import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import logo from "../../src/img/litelogo.png";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import BookIcon from "@material-ui/icons/Book";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeIcon from "@material-ui/icons/Home";
import { history } from "../index";

// Width Of Open Drawer
const drawerWidth = 240;

// Custom Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
      backgroundColor: "#fff",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

// Sidebar Component
const Sidebar = () => {
  // Get Styles
  const classes = useStyles();
  // Get Theme
  const theme = useTheme();
  // Open or Close Sidebar
  const [open, setOpen] = React.useState(false);

  // Open Sidebar
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Close Sidebar
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Return Sidebar
  return (
    <div
      className={classes.root}
      style={{ backgroundColor: "#fff", position: "fixed" }}
    >
      <CssBaseline />

      <Toolbar style={{ backgroundColor: "#fff", position: "fixed" }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          style={{ top: 0, left: 15, position: "fixed" }}
          className={`mb-5 ${clsx(classes.menuButton, open && classes.hide)}`}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        style={{ backgroundColor: "#fff", position: "fixed" }}
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={classes.drawerHeader}
          style={{ backgroundColor: "#fff" }}
        >
          <img
            src={logo}
            className="undraggable"
            style={{
              width: "30%",
              marginRight: "15%",
              marginTop: "5%",
              marginBottom: "5%",
            }}
            alt=""
          />
          <IconButton
            style={{ backgroundColor: "#fff" }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {[
            "Home",
            "Create A Story",
            "My Stories",
            "Search",
            "Today's Stories",
          ].map((text) => (
            <ListItem
              key={text}
              button
              onClick={() => {
                // Redirect To Specific Route
                if (text === "Home") {
                  window.location.href = "/home";
                }
                if (text === "Create A Story") {
                  window.location.href = "/create-story";
                }
                if (text === "My Stories") {
                  return history.push("/my-stories/all");
                }
                if (text === "Search") {
                  return history.push("/search");
                }
                if (text === "Today's Stories") {
                  return history.push("/stories/today");
                }
              }}
            >
              <ListItemIcon>
                {text === "Home" ? (
                  <HomeIcon />
                ) : text === "Create A Story" ? (
                  <AddCircleIcon />
                ) : text === "My Stories" ? (
                  <BookIcon />
                ) : text === "Search" ? (
                  <SearchIcon />
                ) : text === "Today's Stories" ? (
                  <WhatshotIcon />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        style={{ backgroundColor: "#fff", position: "fixed" }}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div
          className={classes.drawerHeader}
          style={{ backgroundColor: "#fff", position: "fixed" }}
        />
      </main>
    </div>
  );
};

export default Sidebar;
