import React from "react";
import {
  Box,
  Image,
  Flex,
  Badge,
  Text,
  Grid,
  GridItem,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import "../styles/MyStories.css";

import { GET_ALL_STORIES } from "../apollo/Queries";

export const MyStories = () => {
  const { data, error, loading } = useQuery(GET_ALL_STORIES);
  if (loading) {
    return <h1>LOADING...</h1>;
  }
  return data.GetAllStories.map((story: any) => (
    <React.Fragment>
      <article className="card" style={{ display: "inline-grid" }}>
        <div className="card__wrapper">
          <figure className="card__feature">
            <img
              src={story.image_url}
              className="card__img"
              alt=""
              width="275"
              height="240"
            />
          </figure>

          <div className="card__box">
            <header className="card__item card__header">
              <h6 className="card__item card__item--small card__label">
                Your Story
              </h6>
              <h2 className="card__item card__item--small card__title">
                {story.title}
              </h2>
            </header>

            <hr className="card__item card__divider" />

            <section className="card__item card__body">
              <p>By: Nikhil Rao</p>
            </section>
          </div>
        </div>
      </article>
    </React.Fragment>
  ));
};
