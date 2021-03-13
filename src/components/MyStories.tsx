import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";
import { GET_ALL_STORIES } from "../apollo/Queries";
import { Button } from "@chakra-ui/react";

export const MyStories = () => {
  const [limit, setLimit] = useState(3);
  const { data, loading, fetchMore } = useQuery(GET_ALL_STORIES, {
    variables: { offset: 0, limit },
  });
  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (typeof data !== undefined) {
    console.log(data);
  }

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
            const dataLen = data.GetAllStories.length;
            fetchMore({
              variables: {
                offset: dataLen,
                limit: 2,
              },
            }).then((res: any) => {
              setLimit(dataLen + res.data.GetAllStories.length);
              if (res.data.GetAllStories.length === 0) {
                const btn = document.getElementById("btn-load");
                btn?.parentNode?.removeChild(btn);
              }
              console.log(res);
            });
          }}
        >
          Load More...
        </Button>
      </div>
    </React.Fragment>
  );
};
