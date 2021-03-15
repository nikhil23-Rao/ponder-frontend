// Modules Imported For Use
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_ALL_STORIES } from "../apollo/Queries";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "../styles/Grid.css";
import { getCurrentUser } from "../utils/getCurrentUser";

// My Stories Component
export const MyStories = () => {
  // Current User Id State
  const [user, setUser] = useState({ username: "" });

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
            style={{ width: "600px", height: "400px", display: "inline-grid" }}
          >
            <div>
              <div className="normal">
                <div className="module">
                  <div className="thumbnail">
                    <img src={story.image_url} alt="" />
                    <div className="date">
                      <div>27</div>
                      <div>Mar</div>
                    </div>
                  </div>
                  <div className="content">
                    <div className="category">{story.category}</div>
                    <h1 className="title">{story.title}</h1>
                    <h2 className="sub-title">By: {user.username}</h2>
                    <div className="description">{previewText}</div>
                    <div className="meta">
                      <span className="timestamp">
                        <i className="fa fa-clock-o"></i> 6 mins ago
                      </span>
                      <span className="comments">
                        <i className="fa fa-comments"></i>
                        <a href="/"> 39 comments</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
    </React.Fragment>
  );
};
