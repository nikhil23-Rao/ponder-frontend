// Modules Imported For Use
import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "@apollo/client";
import { READ_STORY } from "../apollo/Queries";
import ReadStorySideBar from "./ReadStorySideBar";

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
      </React.Fragment>
    );
  }
};
