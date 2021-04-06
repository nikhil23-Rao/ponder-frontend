// Modules Imported For Use
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/getCurrentUser";
import "../styles/HomePage.css";
import "../styles/Positions.css";
import "../styles/logo.css";
import Sidebar from "../components/Sidebar";
import { Dropdown } from "react-bootstrap";
import { logout } from "../utils/logout";
import { history } from "../index";
import { useQuery } from "@apollo/client";
import { GET_STORIES_HOME } from "../apollo/Queries";
import { ArticleCard } from "../components/ArticleCard";
import { StoryArgsInt } from "../../../backend/server/src/interfaces/StoryArgsInt";
import { Heading } from "@chakra-ui/layout";

// Home Component (Renders What Is On The Home Page)
export const Home = () => {
  // State For User
  const [user, setUser] = useState<any>({});

  const { data, loading } = useQuery(GET_STORIES_HOME);

  useEffect(() => {
    // Get User
    const user = getCurrentUser();
    // Store User In State
    setUser(user);
    console.log(user);
  }, []);

  if (loading) {
    return <p>LOADING</p>;
  }

  return (
    <React.Fragment>
      <Heading style={{ textAlign: "center" }}>
        Stories Recommended For You...
      </Heading>
      <div className="topright">
        <Dropdown>
          <Dropdown.Toggle
            className="rounded-circle"
            style={{
              backgroundColor: "#fff",
              borderColor: "#fff",
              outline: "none",
              outlineColor: "#fff",
              boxShadow: "none",
            }}
            id="dropdown-basic"
          >
            <img
              className="topright rounded-circle undraggable clickable"
              src={user.image_url}
              alt=""
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              onClick={() => history.push("/me")}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      {data &&
        data.GetStoriesHome.map((story: StoryArgsInt) => (
          <ArticleCard
            category={story.category}
            title={story.title}
            content={story.content}
            date_created={story.date_created}
            id={story.id}
            image_url={story.image_url}
            showLikes={true}
            likes={story.likes}
            authorName={story.authorName}
          />
        ))}
      <Sidebar />
    </React.Fragment>
  );
};
