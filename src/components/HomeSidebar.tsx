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
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <img
          src="https://www.freelogodesign.org/file/app/client/thumb/09839970-8b55-4c6a-ac20-28d609e20871_200x200.png?1615604135722"
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
          (text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => {
                if (text === "Create A Story") {
                  return history.push("/create-story");
                }
                if (text === "My Stories") {
                  return history.push("/my-stories");
                }
                if (text === "Create A Story") {
                  return history.push("/create-story");
                }
                if (text === "Create A Story") {
                  return history.push("/create-story");
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
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
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
