// Modules Imported For Use
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/editor.css";

export const CreateStory = () => {
  const handleEditorChange = () => {
    console.log("object");
  };

  // Return TinyMCE Editor
  return (
    <React.Fragment>
      <div className="mt-5">
        <input
          style={{
            width: "1000px",
            outline: "none",
            fontSize: "30pt",
            marginLeft: "13.8%",
            whiteSpace: "normal",
            fontWeight: "bold",
          }}
          placeholder="Your Title Here"
        />
      </div>
      <div style={{ marginLeft: "13%", overflow: "hidden" }}>
        <Editor
          initialValue=""
          init={{
            branding: false,
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
            height: "100vh",
            skin: "borderless",
            width: "90%",
            content_style:
              "@import url('https://fonts.googleapis.com/css2?family=Tinos&display=swap'); body { font-family: 'Tinos', serif; font-size: 16pt; color: #292929; }",
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
              "textcolor",
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
          onEditorChange={handleEditorChange}
        />
      </div>
    </React.Fragment>
  );
};
