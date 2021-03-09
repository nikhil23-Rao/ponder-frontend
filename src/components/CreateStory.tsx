import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/editor.css";

export const CreateStory = () => {
  const [publish, setPublish] = useState(false);
  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };

  return (
    <React.Fragment>
      <div>
        <Editor
          initialValue='<h1 style="text-align: center;">(Title Goes Here)</h1>'
          init={{
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
            height: "100vh",
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
            ],
            toolbar: "Publish | SaveDraft",
            quickbars_insert_toolbar:
              "quicktable image media codesample formatselect forecolor backcolor",
            quickbars_selection_toolbar:
              "bold underline italic link |  alignleft aligncenter alignright",
            setup: (editor) => {
              if (!publish) {
                editor.ui.registry.addButton("SaveDraft", {
                  text: "Save As Draft",
                  icon: "document-properties",
                  onAction: (_) => {
                    console.log("Saved As Draft");
                  },
                });
                editor.ui.registry.addButton("Publish", {
                  text: "Publish Story",
                  icon: "plus",
                  onAction: (_) => {
                    console.log("Saved As Draft");
                    setPublish(true);
                  },
                });
              } else {
                return null;
              }
            },
          }}
          apiKey={"ilz513cziydz1sp6f5za1c1ggtokkpr0txis91czgb6tvtx2"}
          onEditorChange={handleEditorChange}
        />
      </div>
    </React.Fragment>
  );
};
