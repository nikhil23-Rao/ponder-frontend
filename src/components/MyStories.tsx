// Modules Imported For Use
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_ALL_STORIES } from "../apollo/Queries";
import { Button } from "@chakra-ui/react";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "../styles/Grid.css";

// My Stories Component
export const MyStories = () => {
  // Limit For Stories`
  const [limit, setLimit] = useState(3);

  // Query The Stories
  const { data, loading, fetchMore } = useQuery(GET_ALL_STORIES, {
    variables: { offset: 0, limit },
  });

  // If Loading Return To Client
  if (loading) {
    return <h1>LOADING...</h1>;
  }

  // Return MyStories Markup
  return (
    <React.Fragment>
      {data.GetAllStories.map((story: any) => {
        const previewText = story.content.replace(/<[^>]+>/g, "");
        return (
          <div key={story.id} className="grid-container ml-5 mr-5">
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
                    {" "}
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
                    // style={{ overflowY: "auto" }}
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
                    By: {story.author.username}
                  </time>
                </div>
              </div>
            </article>
          </div>
        );
      })}
      <div className="bottom mb-4 text-center">
        <Button
          id="btn-load"
          isLoading={loading}
          onClick={() => {
            // Get Data Length
            const dataLen = data.GetAllStories.length;

            // Fetch More Stories (If There)
            fetchMore({
              variables: {
                offset: dataLen,
                limit: 2,
              },
            }).then((res: any) => {
              // Show Stories Requested To Client
              setLimit(dataLen + res.data.GetAllStories.length);
              // If No More Stories To Fetch Remove Load More Button
              if (res.data.GetAllStories.length === 0) {
                const btn = document.getElementById("btn-load");
                btn?.parentNode?.removeChild(btn);
              }
            });
          }}
        >
          Load More...
        </Button>
      </div>
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
