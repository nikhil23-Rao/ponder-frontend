// Modules Imported For Use
import React from "react";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import BookIcon from "@material-ui/icons/Book";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import logo from "../../src/img/litelogo.png";
import { history } from "../index";

// SideBar Width
const drawerWidth = 240;

// Styles For Sidebar
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Sidebar(props: any) {
  const { window: screenWindow } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // NOT MOBILE
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Drawer Info
  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img
          src={logo}
          className="undraggable"
          style={{
            width: "30%",
            marginLeft: "30%",
            marginTop: "5%",
            marginBottom: "5%",
          }}
          alt=""
        />
      </div>
      <Divider />
      <List>
        {["Create A Story", "My Stories", "Search", "Today's Stories"].map(
          (text) => (
            <ListItem
              button
              onClick={() => {
                // Redirect To Specific Route
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
                {text === "Create A Story" ? (
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
          )
        )}
      </List>
    </div>
  );

  const container =
    screenWindow !== undefined ? () => screenWindow().document.body : undefined;

  return (
    <div className={classes.root} style={{ backgroundColor: "#fff" }}>
      <CssBaseline />

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        className={`${classes.menuButton} mb-5`}
      >
        <MenuIcon />
      </IconButton>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
