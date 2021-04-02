// Modules Imported For Use
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_TODAYS_STORIES } from "../apollo/Queries";
import "../styles/Grid.css";
import { getCurrentUser } from "../utils/getCurrentUser";
import "../styles/LikeButton.css";
import Sidebar from "./Sidebar";
import { readingTime } from "../utils/ReadingTime";

// TodaysStories Component
export const TodaysStories = (props: any) => {
  // Current User Id State
  const [, setUser] = useState({});
  // Query The Stories
  const { data, loading } = useQuery(GET_TODAYS_STORIES);

  // On Page Load Set User
  useEffect(() => {
    const currentUser: any = getCurrentUser();
    setUser(currentUser);
  }, []);

  // If Loading Return To Client
  if (loading) {
    return <h1>LOADING...</h1>;
  }

  // Return MyStories Markup
  return (
    <React.Fragment>
      {data.GetTodaysStories.map((story: any) => {
        // Preview Text
        const previewText = story.content.replace(/<[^>]+>/g, "");
        const mins = readingTime(previewText);

        // Return Article Cards
        return (
          <React.Fragment key={story.id}>
            <Sidebar />
            <div
              className="container"
              style={{
                width: "10%",
                display: "inline-grid",
                marginRight: "-3%",
                marginTop: "6%",
              }}
              onClick={() => (window.location.href = `/read/story/${story.id}`)}
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
                      <h1 style={{ fontFamily: "inherit" }}>{mins}</h1>
                      <br />
                      <h2
                        className="sub-title"
                        style={{ fontFamily: "sans-serif", color: "#232B2B" }}
                      >
                        By: {story.authorName}
                      </h2>
                      <p
                        className="description"
                        style={{ fontFamily: "sans-serif" }}
                      >
                        {previewText}
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      marginLeft: "90%",
                      position: "relative",
                      bottom: 30,
                    }}
                  >
                    <i className="fa fa-heart"></i>
                    <span> {story.likes}</span>
                  </div>
                </div>
              </main>
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};
