import * as React from "react";
import "../styles/Search.css";
import Downshift from "downshift";
import { useQuery } from "@apollo/client";
import { GET_TODAYS_STORIES, SEARCH } from "../apollo/Queries";
import { StoryArgsInt } from "../../../backend/server/src/interfaces/StoryArgsInt";
import Sidebar from "./Sidebar";
const queryString = require("query-string");

export const Search: any = (props: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchUrl, setSearchUrl] = React.useState("");
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH, {
    variables: {
      query: searchQuery,
    },
  });
  const obj = queryString.parse(props.location.search);

  React.useEffect(() => {
    window.onload = () => {
      setSearchQuery(obj.q);
      setSearchUrl(obj.q);
    };
  }, [obj.q]);

  const { data, loading } = useQuery(GET_TODAYS_STORIES);
  if (searchLoading || loading) return <h1>Loading</h1>;
  if (data) {
    const { GetTodaysStories } = data;
    return (
      <React.Fragment>
        <Downshift
          onChange={(selected) => setSearchUrl(selected.title)}
          itemToString={(item) => (item ? item.title : "")}
        >
          {({
            getInputProps,
            getItemProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
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
                      value: searchUrl,
                      onChange: (e) => {
                        setSearchUrl(e.currentTarget.value);
                      },
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
                    onClick={() => {
                      window.location.href = `?q=${searchUrl}`;
                    }}
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
                  className: "mx-auto",
                  style: {
                    textAlign: "center",
                    listStyleType: "none",
                    marginTop: "-4.5%",
                    borderRadius: 50,
                  },
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
                      .slice(0, 5)
                      .map((item: StoryArgsInt, index: any) => (
                        <div>
                          <li
                            {...getItemProps({
                              className: "mx-auto",
                              key: item.id,
                              index,
                              item,
                              style: {
                                fontFamily: "Arial",
                                textAlign: "left",
                                border: "1px solid #d4d4d4",
                                padding: 20,
                                backgroundColor:
                                  highlightedIndex === index
                                    ? "#E3E3E3"
                                    : "white",
                                fontWeight: "bold",
                                width: "28%",
                                height: 70,
                                cursor: "pointer",
                              },
                            })}
                          >
                            {item.title}
                          </li>
                        </div>
                      ))
                  : null}
              </ul>
              {searchQuery !== undefined &&
              searchData &&
              searchData.Search.length !== 0
                ? searchData.Search.map((story: StoryArgsInt) => {
                    //Preview Text
                    const previewText = story.content.replace(/<[^>]+>/g, "");

                    // Return Article Cards
                    return (
                      <React.Fragment key={story.id}>
                        <div
                          className="container"
                          style={{
                            width: "10%",
                            display: "inline-grid",
                            marginRight: "-3%",
                            marginTop: "8%",
                          }}
                          onClick={() => {
                            window.location.href = `/read/story/${story.id}`;
                          }}
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
                                    style={{
                                      fontFamily: "sans-serif",
                                      color: "#232B2B",
                                    }}
                                  >
                                    By: {story.authorName}{" "}
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
                  })
                : null}
            </>
          )}
        </Downshift>
        <Sidebar />;
      </React.Fragment>
    );
  }
};
