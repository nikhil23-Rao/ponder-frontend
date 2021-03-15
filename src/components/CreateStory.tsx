import React from "react";
import { DraftailEditor } from "draftail";
import { EditorState } from "draft-js";
import createInlineToolbarPlugin from "draft-js-inline-toolbar-plugin";
import createSideToolbarPlugin from "draft-js-side-toolbar-plugin";
import createImagePlugin from "@draft-js-plugins/image";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import "../styles/editor.css";

import { Button } from "@chakra-ui/react";
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
  changeState = (editorState: EditorState) => {
    this.setState({ editorState });
    console.log("Content:", editorState);
  };

  render() {
    return (
      <React.Fragment>
        <div className="topright">
          <Button>SAVE DRAFT</Button>
        </div>
        <div className="editor">
          <DraftailEditor
            autoComplete={true}
            editorState={this.state.editorState}
            onChange={this.changeState}
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
