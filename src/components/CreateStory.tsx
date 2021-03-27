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
import { GenerateStoryID } from "../utils/GenerateStoryId";
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

// Create Story Function
export const CreateStory = () => {
  // Store All Properties In State
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [user, setUser] = useState({});
  const [draftSaved, setDraftSaved] = useState(false);

  // Open/Close Modal
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

  // Apollo Mutations To Call
  const [SaveDraft] = useMutation(SAVE_DRAFT);
  const [PublishStory] = useMutation(PUBLISH_STORY);

  // On Page Load
  useEffect(() => {
    // Get Current User
    const currentUser: any = getCurrentUser();
    // Set The User In State
    setUser(currentUser);

    // If Draft Is Not Saved Warn User Before Close Tab
    if (!draftSaved) {
      window.onbeforeunload = () => true;
    } else {
      (window.onbeforeunload as any) = undefined;
    }
  }, [draftSaved]);

  // On Editor Change Set Current Content In State
  const handleEditorChange = (content: string, _: any) => {
    setContent(content);
  };

  // What To Do When Save Draft Is Clicked
  const handleSaveDraft = () => {
    // Get Current Date
    const date_created = GetDate();
    // Generate ID
    const id = GenerateStoryID(24);
    // Save Draft With Variables Stored In State And Above
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

    // Close Modal
    draftOnClose();
    // Take User To My Stories Page When Complete
    history.replace("/my-stories/all");
  };

  // What To Do When Publish Story Is Clicked
  const handlePublishStory = () => {
    // Get Current Date
    const date_created = GetDate();
    // Generate ID
    const id = GenerateStoryID(24);

    // Publish Story With Variables Stored In State And Above
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
    // Close Modal
    publishStoryOnClose();
    // Take User To My Stories Page
    history.replace("/my-stories/all");
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
            statusbar: false,
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
