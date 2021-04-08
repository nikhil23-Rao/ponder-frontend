// Modules Imported For Use
import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "@apollo/client";
import { READ_STORY } from "../apollo/Queries";
import { useMutation } from "@apollo/client";
import Sidebar from "../components/Sidebar";
import { Loader } from "../components/Loader";
import "../styles/LikeButton.css";
import "../styles/Text.css";
import { content_style } from "../constants/ContentStyle";
import { LIKE_STORY } from "../apollo/Mutations";
import { getCurrentUser } from "../utils/getCurrentUser";
import { readingTime } from "../utils/ReadingTime";
import { history } from "../index";

// Read Story Component
export const ReadStory: any = (props: any) => {
  // Current User Id State
  const [user, setUser] = useState({});
  // Query The Story To Read
  const { data, loading, refetch } = useQuery(READ_STORY, {
    variables: { storyid: props.match.params.id },
  });

  // Like Story Mutation
  const [HandleLikeStory] = useMutation(LIKE_STORY);

  // On Page Load Set User
  useEffect(() => {
    const currentUser: any = getCurrentUser();
    setUser(currentUser);
    if (data) {
      document.title = data.ReadStory.title;
    }
  }, [data]);

  // If Story Loading Return To Client
  if (loading) {
    return <Loader />;
  }

  // If Story ID Does Not Exist Redirect To Not Found
  if (data.ReadStory === null) {
    window.location.href = "/404-not-found";
  }

  // If Data Then Return READ ONLY TinyMCE Editor With Data
  if (data) {
    // Get Text Of Article
    const text = data.ReadStory.content.replace(/<[^>]+>/g, "");
    // Estimate Reading Time Of Article
    const time = readingTime(text);
    // Return READONLY TinyMCE Editor
    return (
      <React.Fragment>
        <div
          style={{
            position: "absolute",
            width: "90%",
            marginLeft: "5%",
            paddingBottom: "30px",
          }}
        >
          <div
            className="mt-5"
            style={{
              backgroundColor: "#fff",
            }}
          >
            <input
              disabled={true}
              style={{
                width: "1000px",
                outline: "none",
                fontSize: "30pt",
                marginLeft: "13.8%",
                whiteSpace: "normal",
                fontWeight: "bold",
                backgroundColor: "#fff",
              }}
              value={data.ReadStory.title}
            />
          </div>
          <div
            style={{
              marginLeft: "13%",
              overflowY: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={data.ReadStory.authorImage}
              alt=""
              onClick={() =>
                history.push(`/profile/${data.ReadStory.authorid}`)
              }
              style={{
                marginLeft: 7,
                width: "40px",
                height: "40px",
                borderRadius: 20,
                position: "relative",
                top: "13px",
                cursor: "pointer",
              }}
            />
            <br />
            <p
              style={{
                marginLeft: "4%",
                top: 126,
                left: 170,
                position: "absolute",
              }}
              className="text"
            >
              {data.ReadStory.authorName}
            </p>
            <Editor
              initialValue={`<p style="color:gray">${time}</p>${data.ReadStory.content}`}
              disabled={true}
              init={{
                branding: false,
                statusbar: false,
                codesample_languages: [
                  { text: "HTML/XML", value: "markup" },
                  { text: "JavaScript", value: "javascript" },
                  { text: "CSS", value: "css" },
                  { text: "PHP", value: "php" },
                  { text: "Ruby", value: "ruby" },
                  { text: "Python", value: "python" },
                  { text: "Java", value: "java" },
                  { text: "C", value: "c" },
                  { text: "C#", value: "csharp" },
                  { text: "C++", value: "cpp" },
                ],
                placeholder: "Write your story...",
                scrollbars: false,
                height: "100vh",
                width: "90%",
                inline_boundaries: false,
                content_style,
                menubar: false,
                automatic_uploads: true,
                plugins: [
                  "quickbars",
                  "link",
                  "image",
                  "media",
                  "print",
                  "codesample",
                  "formatselect",
                  "alignleft",
                  "aligncenter",
                  "alignright",
                  "fontsizeselect",
                ],
                toolbar: false,
                quickbars_insert_toolbar:
                  "quicktable image link media codesample formatselect fontsizeselect forecolor backcolor |  alignleft aligncenter alignright",
                quickbars_selection_toolbar:
                  "bold underline italic link fontsizeselect |  alignleft aligncenter alignright",
              }}
              apiKey={"ilz513cziydz1sp6f5za1c1ggtokkpr0txis91czgb6tvtx2"}
            />
          </div>
          <Sidebar />
        </div>
        <div className="topright" style={{ backgroundColor: "#fff" }}>
          <label>
            <input
              type="checkbox"
              hidden
              checked={data.ReadStory.likedBy.includes((user as any).id)}
              onChange={async () => {
                await HandleLikeStory({
                  variables: {
                    authorid: (user as any).id,
                    storyid: props.match.params.id,
                  },
                });
                await refetch();
              }}
            />
            <div className="kalp"></div>
          </label>
        </div>
      </React.Fragment>
    );
  }
};
