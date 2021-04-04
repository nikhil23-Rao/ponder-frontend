// Modules Imported For Use
import * as React from "react";
import "../styles/Search.css";
import Downshift from "downshift";
import { useQuery } from "@apollo/client";
import { GET_SEARCHABLE_STORIES, SEARCH } from "../apollo/Queries";
import { StoryArgsInt } from "../../../backend/server/src/interfaces/StoryArgsInt";
import Sidebar from "../components/Sidebar";
import { ArticleCard } from "../components/ArticleCard";
import { GenerateStoryID } from "../utils/GenerateStoryId";
const queryString = require("query-string");

// Search Component
export const Search: any = (props: any) => {
  // Search Query User Types
  const [searchQuery, setSearchQuery] = React.useState("");
  // URL Of Search
  const [searchUrl, setSearchUrl] = React.useState("");
  // Call Backend With Query In State
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH, {
    variables: {
      query: searchQuery,
    },
  });

  // Destructre Data From URL
  const { q } = queryString.parse(props.location.search);

  React.useEffect(() => {
    window.onload = () => {
      // On Window Load Set State
      setSearchQuery(q);
      setSearchUrl(q);
    };
  }, [q]);

  // Get All Stories Query
  const { data, loading } = useQuery(GET_SEARCHABLE_STORIES);
  // If Loading Return To Client
  if (searchLoading || loading) return <h1>Loading</h1>;
  // When Data Build Search Box With Downshift.js Autocomplete
  if (data) {
    const { GetSearchableStories } = data;
    return (
      <React.Fragment>
        <Sidebar />;
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
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        window.location.href = `?q=${searchUrl}`;
                      }
                    }}
                    name="searchQueryInput"
                    placeholder="Search For Stories By Title, Category, or Authors..."
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
                    marginTop: "-93px",
                    borderRadius: 50,
                  },
                })}
              >
                {isOpen
                  ? GetSearchableStories.filter(
                      (story: StoryArgsInt) =>
                        !inputValue ||
                        // Filter By Multiple Columns
                        story.title.match(
                          new RegExp(".*" + inputValue + ".*", "i")
                        ) ||
                        story.category.match(
                          new RegExp(".*" + inputValue + ".*", "i")
                        ) ||
                        story.authorName.match(
                          new RegExp(".*" + inputValue + ".*", "i")
                        )
                    )
                      .slice(0, 5)
                      .map((item: StoryArgsInt, index: any) => (
                        <div key={item.id}>
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
                                width: "400px",
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
                    // Return Article Cards
                    return (
                      <ArticleCard
                        key={story.id}
                        category={story.category}
                        title={story.title}
                        content={story.content}
                        date_created={story.date_created}
                        id={story.id}
                        image_url={story.image_url}
                        likes={story.likes}
                        authorName={story.authorName}
                      />
                    );
                  })
                : null}
            </>
          )}
        </Downshift>
      </React.Fragment>
    );
  }
};
