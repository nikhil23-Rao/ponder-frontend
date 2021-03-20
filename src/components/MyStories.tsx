// Modules Imported For Use
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_ALL_STORIES } from "../apollo/Queries";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "../styles/Grid.css";
import { getCurrentUser } from "../utils/getCurrentUser";
import { Heading } from "@chakra-ui/layout";
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

// My Stories Component
export const MyStories = (props: any) => {
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
    id: 0,
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
  const { data, loading } = useQuery(GET_ALL_STORIES, {
    variables: { authorid: 1 },
  });

  // If Loading Return To Client
  if (loading) {
    return <h1>LOADING...</h1>;
  }

  // If 0 Stories Return Following
  if (data && data.GetAllStories.length === 0) {
    return (
      <React.Fragment>
        <div className="text-center">
          <Heading>You Currently Have No Stories</Heading>
        </div>
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
          onClick={() => (window.location.href = "/create-story")}
        >
          <AddCircleIcon />
        </div>
      </React.Fragment>
    );
  }

  // Return MyStories Markup
  return (
    <React.Fragment>
      {data.GetAllStories.map((story: any) => {
        console.log(story);
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
      <div>
        <Link
          to="/create-story"
          style={{
            top: 0,
            right: 5,
            position: "absolute",
            textDecoration: "none",
          }}
        >
          <AddCircleIcon />
        </Link>
      </div>
      <div style={{ position: "absolute", top: 2, left: 5 }}>
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
          <StyledMenuItem onClick={() => window.location.reload()}>
            <ListItemIcon>
              <SendIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Show All" />
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => (window.location.href = "sortby/published")}
          >
            <ListItemIcon>
              <DraftsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Show Published" />
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => (window.location.href = "sortby/drafts")}
          >
            <ListItemIcon>
              <InboxIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Show Drafts" />
          </StyledMenuItem>
        </StyledMenu>
      </div>
    </React.Fragment>
  );
};
