import React from "react";
import { DraftailEditor } from "draftail";
import { EditorState, convertToRaw } from "draft-js";
import createInlineToolbarPlugin from "@draft-js-plugins/inline-toolbar";
import createSideToolbarPlugin from "@draft-js-plugins/side-toolbar";
import createImagePlugin from "@draft-js-plugins/image";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
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
