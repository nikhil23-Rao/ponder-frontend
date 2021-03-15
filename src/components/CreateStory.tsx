import React from "react";
import { DraftailEditor } from "draftail";
import { EditorState, convertToRaw } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import createImagePlugin from "@draft-js-plugins/image";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "../styles/editor.css";
import { TextField } from "@material-ui/core";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "draft-js-buttons";
import { Flex } from "@chakra-ui/layout";

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
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  ],
});
const { InlineToolbar } = inlineToolbarPlugin;
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
            autoComplete={true}
            editorState={this.state.editorState}
            onChange={this.handleChange}
            placeholder="Write your story..."
            plugins={plugins}
          />
          <InlineToolbar>
            {(externalProps: any) => (
              <>
                <ItalicButton {...externalProps} />
                <BoldButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <UnorderedListButton {...externalProps} />
                <HeadlineOneButton {...externalProps} />
                <HeadlineTwoButton {...externalProps} />
                <HeadlineThreeButton {...externalProps} />
                <OrderedListButton {...externalProps} />
                <CodeBlockButton {...externalProps} />
                <BlockquoteButton {...externalProps} />
              </>
            )}
          </InlineToolbar>
          <SideToolbar />
        </div>
      </React.Fragment>
    );
  }
}
