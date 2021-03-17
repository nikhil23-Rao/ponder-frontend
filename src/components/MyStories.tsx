// Modules Imported For Use
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_ALL_STORIES } from "../apollo/Queries";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "../styles/Grid.css";
import { getCurrentUser } from "../utils/getCurrentUser";

// My Stories Component
export const MyStories = () => {
  // Current User Id State
  const [user, setUser] = useState({});

  // On Page Load Set User
  useEffect(() => {
    const currentUser: any = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Query The Stories
  const { data, loading } = useQuery(GET_ALL_STORIES, {
    variables: { authorid: (user as any).id },
  });

  // If Loading Return To Client
  if (loading) {
    return <h1>LOADING...</h1>;
  }

  // Return MyStories Markup
  return (
    <React.Fragment>
      {data.GetAllStories.map((story: any) => {
        // Preview Text
        const previewText = story.content.replace(/<[^>]+>/g, "");

        // Return Article Cards
        return (
          <div
            className="container mt-5"
            style={{ width: "400px", display: "inline-grid" }}
          >
            <main>
              <div className="hover">
                <div className="module">
                  <div className="thumbnail">
                    <img src={story.image_url} alt="" />
                    <div className="date">
                      <div>27</div>
                      <div>Mar</div>
                    </div>
                  </div>
                  <div className="content">
                    <div
                      className="category"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {story.category}
                    </div>
                    <h1 className="title" style={{ fontFamily: "sans-serif" }}>
                      {story.title}
                    </h1>
                    <p className="description">
                      New York, the largest city in the U.S., is an
                      architectural marvel with plenty of historic monuments,
                      magnificent buildings and countless dazzling skyscrapers.
                    </p>
                    <div className="meta">
                      <span className="timestamp">
                        <i className="fa fa-clock-o"></i> 6 mins ago
                      </span>
                      <span className="comments">
                        <i className="fa fa-comments"></i>
                        <a href="#"> 39 comments</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        );
      })}
      <div>
        <Link
          to="/create-story"
          style={{
            top: -45,
            right: 5,
            position: "absolute",
            textDecoration: "none",
          }}
        >
          <AddCircleIcon />
        </Link>
      </div>
    </React.Fragment>
  );
};
