// Modules Imported For Use
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import "../styles/Grid.css";
import { getCurrentUser } from "../utils/getCurrentUser";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import { UserStateInt } from "../interfaces/UserStateInt";
import Sidebar from "./Sidebar";
import { SORT_BY_PUBLISHED } from "../apollo/Queries";

// Sort By Published Component
export const SortByPublished: any = () => {
  // Styles For Sort By Menu
  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props: MenuProps) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  // Styles For Sort By Menu Item
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  // Current User Id State
  const [user, setUser] = useState<UserStateInt>({
    id: "",
    username: "",
    email: "",
    iat: "",
    image_url: "",
  });

  // Menu Item State
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // On Click Change Color Of Menu Item
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // On Close Close Menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // On Page Load Set User
  useEffect(() => {
    const currentUser: any = getCurrentUser();
    console.log(currentUser);
    setUser(currentUser);
  }, []);

  // Query The Stories
  const { data, loading } = useQuery(SORT_BY_PUBLISHED, {
    variables: { authorid: (user as any).id },
  });

  // If Loading Return To Client
  if (loading) {
    return <h1>LOADING...</h1>;
  }

  // If 0 Stories Return Following
  if (data && data.SortByPublished.length === 0) {
    return (
      <React.Fragment>
        <div className="text-center">
          <div style={{ fontSize: "36pt" }}>
            You Currently Have No Published Stories
          </div>
        </div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img
            style={{
              width: 500,
            }}
            className="undraggable"
            src="https://lh3.googleusercontent.com/-i0raiq7i2HA/YGEJppqrLNI/AAAAAAAAAnw/AD_tzhHmUdAaDLh8R08Pk3Ql_ZnKaBsHwCK8BGAsYHg/s0/2021-03-28.png?authuser=0"
            alt=""
          />
        </div>
      </React.Fragment>
    );
  }

  // Return Published Stories Markup
  return (
    <React.Fragment>
      {data.SortByPublished.map((story: any) => {
        // Preview Text
        const previewText = story.content.replace(/<[^>]+>/g, "");

        // Return Article Cards
        return (
          <React.Fragment key={story.id}>
            <div
              className="container"
              style={{
                width: "10%",
                display: "inline-grid",
                marginRight: "-3%",
                marginTop: "8%",
              }}
              onClick={() => {
                if (story.likes === null) {
                  window.location.href = `/edit/draft/${story.id}`;
                } else {
                  window.location.href = `/read/story/${story.id}`;
                }
              }}
            >
              <main>
                <div className="hover">
                  <div className="module">
                    <div className="thumbnail">
                      <img src={story.image_url} alt="" />
                      <div
                        className="date"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        <div>{story.date_created[1]}</div>
                        <div>{story.date_created[0]}</div>
                      </div>
                    </div>
                    <div className="content">
                      <div
                        className="category"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {story.category}
                      </div>
                      <h1
                        className="title"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {story.title}
                      </h1>
                      <h2
                        className="sub-title"
                        style={{ fontFamily: "sans-serif", color: "#232B2B" }}
                      >
                        By: {user.username}{" "}
                      </h2>
                      <p
                        className="description"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {previewText}
                      </p>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </React.Fragment>
        );
      })}

      <div style={{ position: "absolute", top: 2, right: 5 }}>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
        >
          <SortIcon />
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem
            onClick={() => (window.location.href = "/my-stories/all")}
          >
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Show All" />
          </StyledMenuItem>
          <StyledMenuItem onClick={() => window.location.reload()}>
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Show Published" />
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => (window.location.href = "/my-stories/sortby/drafts")}
          >
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Show Drafts" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
      <div
        style={{ backgroundColor: "#fff", position: "fixed", width: "100%" }}
      >
        <Sidebar />
      </div>
    </React.Fragment>
  );
};
