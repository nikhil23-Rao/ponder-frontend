import * as React from "react";
import "../styles/Search.css";
import Downshift from "downshift";
import { useQuery } from "@apollo/client";
import { GET_TODAYS_STORIES } from "../apollo/Queries";
import { StoryArgsInt } from "../../../backend/server/src/interfaces/StoryArgsInt";

export const Search: any = () => {
  const { data, loading } = useQuery(GET_TODAYS_STORIES);
  if (loading) return <h1>Loading</h1>;
  if (data) {
    const { GetTodaysStories } = data;
    console.log(GetTodaysStories);
    return (
      <Downshift
        onChange={(selected) => alert(selected ? `Selected` : "No Results")}
        itemToString={(item) => (item ? item.title : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <>
            <div className="wrapper">
              <div
                className="searchBar"
                {...getRootProps({} as any, { suppressRefError: true })}
              >
                <input
                  id="searchQueryInput"
                  type="text"
                  name="searchQueryInput"
                  placeholder="Search For Stories, Authors, And More..."
                  {...getInputProps({
                    style: {
                      width: "100%",
                      height: "2.8rem",
                      background: "#f5f5f5",
                      outline: "none",
                      border: "none",
                      borderRadius: "1.625rem",
                      padding: "0 3.5rem 0 1.5rem",
                      fontSize: "1rem",
                    },
                  })}
                />
                <button
                  id="searchQuerySubmit"
                  type="submit"
                  name="searchQuerySubmit"
                >
                  <svg
                    style={{ width: "24px", height: "24px" }}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#666666"
                      d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <ul
              {...getMenuProps({
                style: { textAlign: "center" },
              })}
            >
              {isOpen
                ? GetTodaysStories.filter(
                    (story: StoryArgsInt) =>
                      !inputValue ||
                      story.title.match(
                        new RegExp(".*" + inputValue + ".*", "i")
                      )
                  )
                    .slice(0, 10)
                    .map((item: StoryArgsInt, index: any) => (
                      <li
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index ? "gray" : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                            width: "20%",
                            cursor: "pointer",
                            display: "inline-block",
                          },
                        })}
                      >
                        {item.title}
                      </li>
                    ))
                : null}
            </ul>
          </>
        )}
      </Downshift>
    );
  }
};
