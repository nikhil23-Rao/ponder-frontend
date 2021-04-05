// Modules Imported For Use
import * as React from "react";
import { readingTime } from "../utils/ReadingTime";
import { UserStateInt } from "../interfaces/UserStateInt";

// Props
interface IProps {
  content: string;
  image_url: string;
  title: string;
  id: string;
  date_created: Array<string>;
  category: string;
  likes: number;
  showLikes?: boolean;
  user?: UserStateInt;
  authorName?: string;
}

// Card Component
export const ArticleCard = ({
  content,
  likes,
  id,
  title,
  category,
  date_created,
  user,
  image_url,
  showLikes,
  authorName,
}: IProps) => {
  // Get Preview Text
  const previewText = content.replace(/<[^>]+>/g, "");

  // Get Reading Time
  const mins = readingTime(previewText);

  return (
    <React.Fragment>
      <div
        className="container"
        style={{
          width: "10%",
          display: "inline-grid",
          marginRight: "-3%",
          marginTop: "8%",
        }}
        onClick={() => {
          if (likes === null) {
            window.location.href = `/edit/draft/${id}`;
          } else {
            window.location.href = `/read/story/${id}`;
          }
        }}
      >
        <main>
          <div className="hover">
            <div className="module">
              <div className="thumbnail">
                <img src={image_url} alt="" />
                <div className="date" style={{ fontFamily: "sans-serif" }}>
                  <div>{date_created[1]}</div>
                  <div>{date_created[0]}</div>
                </div>
              </div>
              <div className="content">
                <div className="category" style={{ fontFamily: "sans-serif" }}>
                  {category}
                </div>
                <h1 className="title" style={{ fontFamily: "sans-serif" }}>
                  {title}
                </h1>
                <h1 style={{ fontFamily: "inherit" }}>{mins}</h1>
                <br />
                <h2
                  className="sub-title"
                  style={{ fontFamily: "sans-serif", color: "#232B2B" }}
                >
                  By: {user ? user.username : authorName}{" "}
                </h2>
                <p className="description" style={{ fontFamily: "sans-serif" }}>
                  {previewText}
                </p>
              </div>
            </div>
            {showLikes && (
              <div
                style={{
                  marginLeft: "90%",
                  position: "relative",
                  bottom: 30,
                }}
              >
                <i className="fa fa-heart"></i>
                <span> {likes}</span>
              </div>
            )}
          </div>
        </main>
      </div>
    </React.Fragment>
  );
};
