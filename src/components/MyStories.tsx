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

  if (data && data.GetAllStories.length === 0) {
    return <h1>You Currently Have No Drafts</h1>;
  }

  // Return MyStories Markup
  return (
    <React.Fragment>
      {data.GetAllStories.map((story: any) => {
        // Preview Text
        const previewText = story.content.replace(/<[^>]+>/g, "");

        // Return Article Cards
        return (
          <React.Fragment>
            <div
              className="container mt-5"
              key={story.id}
              style={{ width: "20%", display: "inline-grid" }}
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
                        By: {(user as any).username}
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
    </React.Fragment>
  );
};
