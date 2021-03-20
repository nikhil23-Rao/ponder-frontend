// Modules Imported For Use
import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/editor.css";
import Button from "@material-ui/core/Button";
import { PUBLISH_STORY, SAVE_DRAFT } from "../apollo/Mutations";
import { TextField } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { getCurrentUser } from "../utils/getCurrentUser";
import { GetDate } from "../utils/GetDate";
import "../styles/Modal.css";
import { Prompt } from "react-router-dom";
import { history } from "../index";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export const CreateStory = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState({});
  const [draftSaved, setDraftSaved] = useState(false);
  const {
    isOpen: draftIsOpen,
    onOpen: draftOnOpen,
    onClose: draftOnClose,
  } = useDisclosure();
  const {
    isOpen: publishStoryIsOpen,
    onOpen: publishStoryOnOpen,
    onClose: publishStoryOnClose,
  } = useDisclosure();

  useEffect(() => {
    const currentUser: any = getCurrentUser();
    setUser(currentUser);
    if (!draftSaved) {
      window.onbeforeunload = () => true;
    } else {
      (window.onbeforeunload as any) = undefined;
    }
  }, [draftSaved]);

  const [SaveDraft] = useMutation(SAVE_DRAFT);
  const [PublishStory] = useMutation(PUBLISH_STORY);

  const handleEditorChange = (content: string, editor: any) => {
    console.log("Content was updated:", content);
    setContent(content);
  };

  function makeid(length: any) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  console.log(makeid(5));

  const handleSaveDraft = () => {
    const date_created = GetDate();
    const id = makeid(8);
    console.log(date_created);
    SaveDraft({
      variables: {
        title,
        content,
        image_url: imageUrl,
        date_created,
        category,
        authorid: (user as any).id,
        id,
      },
    });

    draftOnClose();
    // history.replace("/my-stories/all");
  };

  const handlePublishStory = () => {
    const date_created = GetDate();
    console.log(date_created);
    const id = makeid(8);
    PublishStory({
      variables: {
        title,
        content,
        image_url: imageUrl,
        date_created,
        category,
        id,
        authorid: (user as any).id,
      },
    });
    publishStoryOnClose();
    // history.replace("/my-stories/all");
  };
  // Return TinyMCE Editor
  return (
    <React.Fragment>
      <Prompt when={!draftSaved} message="Are You Sure You Want To Leave" />
      <div>
        <div style={{ top: -40, right: 8, position: "absolute" }}>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => {
              publishStoryOnOpen();
              setDraftSaved(true);
            }}
          >
            Publish Story{" "}
          </Button>
        </div>
        <div style={{ top: -40, right: 140, position: "absolute" }}>
          <Button
            variant="outlined"
            size="small"
            color="primary"
            onClick={() => {
              draftOnOpen();
              setDraftSaved(true);
            }}
          >
            Save As Draft{" "}
          </Button>
        </div>
        <Modal isOpen={draftIsOpen} onClose={draftOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Save Draft</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="text-center mt-2">
                <TextField
                  style={{ width: "400px" }}
                  value={imageUrl}
                  variant="outlined"
                  placeholder="Enter An Image URL To Represent Your Story"
                  onChange={(e) => setImageUrl(e.currentTarget.value)}
                />
              </div>
              <div className="text-center mt-3">
                <TextField
                  style={{ width: "400px" }}
                  value={category}
                  variant="outlined"
                  placeholder="Enter Story Category"
                  onChange={(e) => setCategory(e.currentTarget.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="mx-auto">
                <Button
                  onClick={handleSaveDraft}
                  variant="outlined"
                  color="secondary"
                >
                  Save Draft
                </Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={publishStoryIsOpen} onClose={publishStoryOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Publish Story</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="text-center mt-2">
                <TextField
                  style={{ width: "400px" }}
                  value={imageUrl}
                  variant="outlined"
                  placeholder="Enter An Image URL To Represent Your Story"
                  onChange={(e) => setImageUrl(e.currentTarget.value)}
                />
              </div>
              <div className="text-center mt-3">
                <TextField
                  style={{ width: "400px" }}
                  value={category}
                  variant="outlined"
                  placeholder="Enter Story Category"
                  onChange={(e) => setCategory(e.currentTarget.value)}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="mx-auto">
                <Button
                  onClick={handlePublishStory}
                  variant="outlined"
                  color="secondary"
                >
                  Publish Story{" "}
                </Button>
              </div>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
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
          value={title}
          onChange={(e: any) => {
            setTitle(e.currentTarget.value);
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
