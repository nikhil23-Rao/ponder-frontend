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
          <div key={story.id} className="grid-container ml-5 mr-4">
            <article className="articles__article-card mr-5 mt-5 ml-5">
              <div className="articles__article-card__top">
                <img src={story.image_url} alt="" />
              </div>
              <Divider />
              <div className="articles__article-card__bottom">
                <div className="articles__article-card__bottom__date-title">
                  <h1
                    className="articles__article-card__bottom__date-title__title font-weight-bold"
                    style={{
                      fontSize: "30px",
                      fontFamily: "Playfair Display",
                    }}
                  >
                    {story.title}
                  </h1>
                  <time
                    className="articles__article-card__bottom__date-title__date letter-spacing font-weight-bold"
                    dateTime="2019-02-02"
                  >
                    Created: {story.date_created}
                  </time>
                  <br />
                  <Divider />
                  <br />
                  <p
                    className="articles__article-card__bottom__date-title__date letter-spacing font-weight-bold text-center"
                    style={{ overflowY: "auto" }}
                  >
                    Preview: {previewText.substring(0, 10)}...
                  </p>
                  <time
                    className="articles__article-card__bottom__date-title__date letter-spacing font-weight-bold"
                    dateTime="2019-02-02"
                    style={{
                      marginTop: "38%",
                      marginLeft: "60%",
                      overflowY: "auto",
                    }}
                  >
                    By: {(user as any).username}
                  </time>
                </div>
              </div>
            </article>
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
