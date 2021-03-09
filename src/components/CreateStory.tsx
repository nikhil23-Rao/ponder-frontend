import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export const CreateStory = () => {
  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
  };
  return (
    <Editor
      initialValue='<h1 style="text-align: center;">(Title Goes Here)</h1>'
      init={{
        height: "100vh",
        menubar: true,
        automatic_uploads: true,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount emoticons fullscreen table codesample",
        ],
        setup: (editor) => {
          editor.ui.registry.addButton("SaveDraft", {
            text: "Save As Draft",
            icon: "document-properties",
            onAction: (_) => {
              console.log("Saved As Draft");
            },
          });
        },
        toolbar1:
          // eslint-disable-next-line no-multi-str
          "undo redo | formatselect |  fontselect | bold italic backcolor table | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | media | link | insertfile | image | codesample | print | emoticons | preview | searchreplace| SaveDraft |help",
      }}
      apiKey={"ilz513cziydz1sp6f5za1c1ggtokkpr0txis91czgb6tvtx2"}
      onEditorChange={handleEditorChange}
    />
  );
};
