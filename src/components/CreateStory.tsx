<<<<<<< HEAD
import React from "react";
import { DraftailEditor } from "draftail";
import { EditorState, convertToRaw } from "draft-js";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import createImagePlugin from "@draft-js-plugins/image";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
=======
// Modules Imported For Use
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
>>>>>>> parent of 40279a5 (New UI For Cards.)
import "../styles/editor.css";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "draft-js-buttons";
import { Button } from "@material-ui/core";

const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const linkifyPlugin = createLinkifyPlugin({
  component: (props: any) => {
    const { contentState, ...rest } = props;
    return (
      <a
        {...rest}
        onClick={() => {
          window.open(rest.href, "_blank");
        }}
      >
        {}
      </a>
    );
  },
});
const imagePlugin = createImagePlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin();
const sideToolbarPlugin = createSideToolbarPlugin();
const { SideToolbar } = sideToolbarPlugin;

const plugins = [
  inlineToolbarPlugin,
  sideToolbarPlugin,
  imagePlugin,
  linkifyPlugin,
];

export interface Props {}

export interface State {
  editorState: EditorState;
}

export class CreateStory extends React.Component<Props, State> {
  state = { editorState: EditorState.createEmpty() };
  handleChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    this.setState({ editorState });
    console.log("Content:", convertToRaw(contentState));
  };

<<<<<<< HEAD
  render() {
    return (
      <React.Fragment>
        <div className="mt-5">
          <input
            style={{
              width: "1000px",
              outline: "none",
              fontSize: "30pt",
              marginLeft: "20.4%",
              fontWeight: "bold",
            }}
            placeholder="Your Title Here"
          />
        </div>
        <div className="editor">
          <DraftailEditor
            editorState={this.state.editorState}
            onChange={this.handleChange}
            placeholder="Write your story..."
            plugins={plugins}
          />
          <SideToolbar />
          <inlineToolbarPlugin.InlineToolbar>
            {(externalProps: any) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <CodeButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
              </div>
            )}
          </inlineToolbarPlugin.InlineToolbar>
        </div>
      </React.Fragment>
    );
  }
}
=======
  // Return TinyMCE Editor
  return (
    <React.Fragment>
      {saveDraft && SaveDraftModal()}
      <div>
        <Editor
          initialValue=""
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
            placeholder: "Write your story...",
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
              "fontsizeselect",
            ],
            toolbar: !publish ? "Publish | SaveDraft" : false,
            quickbars_insert_toolbar:
              "quicktable image media codesample formatselect fontsizeselect forecolor backcolor |  alignleft aligncenter alignright",
            quickbars_selection_toolbar:
              "bold underline italic link fontsizeselect |  alignleft aligncenter alignright",
            setup: (editor) => {
              if (!publish) {
                // When Not Published Show ToolBar
                editor.ui.registry.addButton("SaveDraft", {
                  text: "Save As Draft",
                  icon: "document-properties",
                  onAction: (_) => {
                    // If Draft Not Saved Save It And Show Modal
                    if (saveDraft === false) {
                      setSaveDraft(true);
                    }
                    // Save Draft To DB
                    const date_created = GetDate();
                    const content = editor.getContent();
                    SaveDraftContent({
                      variables: {
                        content,
                        authorid: (user as any).id,
                        date_created,
                      },
                    });
                  },
                });
                editor.ui.registry.addButton("Publish", {
                  text: "Publish Story",
                  icon: "plus",
                  onAction: (_) => {
                    // Publish Story Logic
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
          disabled={publish}
        />
      </div>
    </React.Fragment>
  );
};
>>>>>>> parent of 40279a5 (New UI For Cards.)
