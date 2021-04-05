// Modules Imported For Use
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_TODAYS_STORIES } from "../apollo/Queries";
import "../styles/Grid.css";
import { getCurrentUser } from "../utils/getCurrentUser";
import "../styles/LikeButton.css";
import Sidebar from "../components/Sidebar";
import { ArticleCard } from "../components/ArticleCard";

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

  // Return TodaysStories Markup
  return (
    <React.Fragment>
      {data.GetTodaysStories.map((story: any) => {
        // Return Article Cards
        return (
          <ArticleCard
            category={story.category}
            title={story.title}
            content={story.content}
            date_created={story.date_created}
            id={story.id}
            image_url={story.image_url}
            likes={story.likes}
            authorName={story.authorName}
            showLikes={true}
          />
        );
      })}
      <Sidebar />
    </React.Fragment>
  );
};
