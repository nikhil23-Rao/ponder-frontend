// Modules Imported For Use
import React, { useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { content_style } from "../constants/ContentStyle";
import "../styles/editor.css";
import Button from "@material-ui/core/Button";
import { SelectCategory } from "../components/SelectCategory";
import { CATEGORIES } from "../constants/Categories";
import {
  EDIT_DRAFT,
  PUBLISH_STORY,
  DELETE_DRAFT_ONCE_PUBLISHED,
} from "../apollo/Mutations";
import { GET_EDIT_DRAFT } from "../apollo/Queries";
import { TextField } from "@material-ui/core";
import { useMutation, useQuery } from "@apollo/client";
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

// Edit Draft Function
export const EditDraft: any = (props: any) => {
  // Store All Properties In State
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [user, setUser] = useState({});
  const [draftSaved] = useState(false);

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
  const [EditDraft] = useMutation(EDIT_DRAFT);
  const [PublishStory] = useMutation(PUBLISH_STORY);
  const [DeleteDraftOncePublished] = useMutation(DELETE_DRAFT_ONCE_PUBLISHED);

  // Apollo Queries To Call
  const { data, loading } = useQuery(GET_EDIT_DRAFT, {
    variables: {
      storyid: props.match.params.id,
    },
  });

  // On Page Load
  useEffect(() => {
    // Get Current User
    const currentUser: any = getCurrentUser();
    // Set The User In State
    setUser(currentUser);

    // Autocomplete And Set All Previous Properties In State
    if (data) {
      setImageUrl(data.GetEditDraft.image_url);
      setTitle(data.GetEditDraft.title);
      setCategory(data.GetEditDraft.category);
      setEditorContent(data.GetEditDraft.content);
    }

    if (!draftSaved) {
      window.onbeforeunload = () => true;
    }
  }, [data, draftSaved]);

  // When Loading Return Markup To Client
  if (loading) {
    return <h1>Loading</h1>;
  }

  // On Editor Change Set Current Content In State
  const handleEditorChange = (content: string, _: any) => {
    setEditorContent(content);
  };

  // What To Do When Save Draft Is Clicked
  const handleSaveDraft = () => {
    // Remove Warning
    window.onbeforeunload = null;

    // Get Current Date
    const date_created = GetDate();
    // Save Draft With Variables Stored In State And Above
    EditDraft({
      variables: {
        title,
        content: editorContent,
        image_url: imageUrl,
        date_created,
        category,
        storyid: props.match.params.id,
      },
    });

    // Close Modal
    draftOnClose();

    // Take User To My Stories Page When Complete
    history.replace("/my-stories/all");
  };

  // What To Do When Publish Story Is Clicked
  const handlePublishStory = () => {
    // Remove Warning
    window.onbeforeunload = null;

    // Get Current Date
    const date_created = GetDate();
    // Generate ID
    const id = GenerateStoryID(24);

    // Publish Story With Variables Stored In State And Above
    PublishStory({
      variables: {
        title,
        content: editorContent,
        image_url: imageUrl,
        date_created,
        category,
        id,
        authorid: (user as any).id,
      },
    });

    // After Story Published Delete Old Draft
    DeleteDraftOncePublished({
      variables: {
        storyid: props.match.params.id,
      },
    });

    // Close Modal
    publishStoryOnClose();

    // Take User To My Stories Page
    history.replace("/my-stories/all");
  };

  // Return TinyMCE Editor If We Have Data
  if (data) {
    return (
      <React.Fragment>
        <Prompt
          when={!draftSaved}
          message="Are You Sure You Want To Leave? Your Changes Will Not Be Saved"
        />
        <div>
          <div style={{ top: -40, right: 8, position: "absolute" }}>
            <Button
              variant="outlined"
              size="small"
              color="secondary"
              onClick={() => {
                publishStoryOnOpen();
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
                  <SelectCategory
                    options={CATEGORIES}
                    id="selectCat"
                    value={category}
                    onChange={(e: any) => setCategory(e.currentTarget.value)}
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
                  <SelectCategory
                    options={CATEGORIES}
                    id="selectCatPub"
                    value={category}
                    onChange={(e: any) => setCategory(e.currentTarget.value)}
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
            initialValue={editorContent}
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
              content_style,
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
  }
};
