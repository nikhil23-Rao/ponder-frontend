// Modules Imported For Use
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "@apollo/client";
import { READ_STORY } from "../apollo/Queries";
import ReadStorySideBar from "./ReadStorySideBar";
import "../styles/LikeButton.css";

// Read Story Component
export const ReadStory: any = (props: any) => {
  // Query The Story To Read
  const { data, loading } = useQuery(READ_STORY, {
    variables: { storyid: props.match.params.id },
  });

  // If Story Loading Return To Client
  if (loading) {
    return <h1>STORY LOADING</h1>;
  }

  // If Story ID Does Not Exist Redirect To Not Found
  if (data.ReadStory === null) {
    window.location.href = "/404-not-found";
  }

  // If Data Then Return READ ONLY TinyMCE Editor With Data
  if (data) {
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
            <Editor
              initialValue={`<p>By: Nikhil Rao</p>${data.ReadStory.content}`}
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
                skin: "borderless",
                width: "90%",
                content_style:
                  "@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap'); body { font-family: 'Oranienbaum', serif; font-size: 16pt; color: #292929; background-color: #fff; }",
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
          <ReadStorySideBar />
        </div>
        <div id="main-content">
          <div>
            <input type="checkbox" id="checkbox" />
            <label htmlFor="checkbox">
              <svg
                id="heart-svg"
                viewBox="467 392 58 57"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  id="Group"
                  fill="none"
                  fill-rule="evenodd"
                  transform="translate(467 392)"
                >
                  <path
                    d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
                    id="heart"
                    fill="#AAB8C2"
                  />
                  <circle
                    id="main-circ"
                    fill="#E2264D"
                    opacity="0"
                    cx="29.5"
                    cy="29.5"
                    r="1.5"
                  />

                  <g id="grp7" opacity="0" transform="translate(7 6)">
                    <circle id="oval1" fill="#9CD8C3" cx="2" cy="6" r="2" />
                    <circle id="oval2" fill="#8CE8C3" cx="5" cy="2" r="2" />
                  </g>

                  <g id="grp6" opacity="0" transform="translate(0 28)">
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="7" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="3" cy="2" r="2" />
                  </g>

                  <g id="grp3" opacity="0" transform="translate(52 28)">
                    <circle id="oval2" fill="#9CD8C3" cx="2" cy="7" r="2" />
                    <circle id="oval1" fill="#8CE8C3" cx="4" cy="2" r="2" />
                  </g>

                  <g id="grp2" opacity="0" transform="translate(44 6)">
                    <circle id="oval2" fill="#CC8EF5" cx="5" cy="6" r="2" />
                    <circle id="oval1" fill="#CC8EF5" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp5" opacity="0" transform="translate(14 50)">
                    <circle id="oval1" fill="#91D2FA" cx="6" cy="5" r="2" />
                    <circle id="oval2" fill="#91D2FA" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp4" opacity="0" transform="translate(35 50)">
                    <circle id="oval1" fill="#F48EA7" cx="6" cy="5" r="2" />
                    <circle id="oval2" fill="#F48EA7" cx="2" cy="2" r="2" />
                  </g>

                  <g id="grp1" opacity="0" transform="translate(24)">
                    <circle id="oval1" fill="#9FC7FA" cx="2.5" cy="3" r="2" />
                    <circle id="oval2" fill="#9FC7FA" cx="7.5" cy="2" r="2" />
                  </g>
                </g>
              </svg>
            </label>
          </div>
        </div>
      </React.Fragment>
    );
  }
};
