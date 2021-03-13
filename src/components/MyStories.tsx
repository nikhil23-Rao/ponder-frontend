// Modules Imported For Use
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_ALL_STORIES } from "../apollo/Queries";
import { Button } from "@chakra-ui/react";

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
      {data.GetAllStories.map((story: any) => (
        <article className="articles__article-card mr-5 mt-5 ml-5">
          <div className="articles__article-card__top">
            <img src={story.image_url} alt="" />
            <span className="articles__article-card__top__article-cat letter-spacing">
              (TOPIC NAME)
            </span>
          </div>
          <div className="articles__article-card__bottom">
            <div className="articles__article-card__bottom__date-title mt-3">
              <time
                className="articles__article-card__bottom__date-title__date letter-spacing"
                dateTime="2019-02-02"
              >
                FEBRUARY 2ND, 2019
              </time>
              <h2 className="articles__article-card__bottom__date-title__title font-weight-bold">
                {" "}
                {story.title}
              </h2>
              <time
                className="articles__article-card__bottom__date-title__date letter-spacing font-weight-bold"
                dateTime="2019-02-02"
                style={{ marginTop: "18%", marginLeft: "55%" }}
              >
                By: Fattness Rules
              </time>
            </div>
          </div>
        </article>
      ))}
      <div className="bottom mb-4 text-center">
        <Button
          id="btn-load"
          className=""
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
    </React.Fragment>
  );
};
