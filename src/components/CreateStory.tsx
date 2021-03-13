// Modules Imported For Use
import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/editor.css";
import {
  SAVE_DRAFT_CONTENT,
  SAVE_DRAFT_TITLE_AND_IMAGEURL,
} from "../apollo/Mutations";
import { useMutation, useQuery } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { StoryTitleTextField } from "../validation/StoryTitleTextField";
import { StoryValidationSchema } from "../validation/StoryValidationSchema";
import { GET_ID_QUERY } from "../apollo/Queries";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { history } from "../index";
import { useEffect } from "react";
import { getCurrentUser } from "../utils/getCurrentUser";
import { GetDate } from "../utils/GetDate";

// Create Story Function
export const CreateStory = () => {
  // States
  const [publish, setPublish] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser: any = getCurrentUser();
    setUser(currentUser);
  }, []);

  // Log Content (ONLY IN DEV)
  const handleEditorChange = (content: any) => {
    console.log("Content was updated:", content);
  };

  // Save Draft
  const [SaveDraftContent] = useMutation(SAVE_DRAFT_CONTENT);
  const [SaveDraftTitleAndImageUrl] = useMutation(
    SAVE_DRAFT_TITLE_AND_IMAGEURL
  );

  // Get Id To Update Title
  const { data } = useQuery(GET_ID_QUERY);

  // Save Draft Modal
  const SaveDraftModal = () => {
    return (
      <>
        <Modal isOpen={saveDraft} onClose={() => setSaveDraft(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Save Draft</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Formik
                initialValues={{ title: "", image_url: "", category: "" }}
                onSubmit={(values) => {
                  // Save Title And Image Url To Draft
                  SaveDraftTitleAndImageUrl({
                    variables: {
                      id: data.GetStoryDraftID,
                      title: values.title,
                      image_url: values.image_url,
                      category: values.category,
                    },
                  });
                  // Close Modal
                  setSaveDraft(false);
                  // Push To My Stories Page
                  history.push("/my-stories");
                }}
                validationSchema={StoryValidationSchema}
              >
                {({ handleSubmit, handleChange }) => (
                  <Form onSubmit={() => handleSubmit}>
                    <div className="text-center">
                      <Field
                        as={StoryTitleTextField}
                        name="title"
                        onChange={handleChange}
                        placeholder="Enter Story Title"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <Field
                        as={StoryTitleTextField}
                        name="image_url"
                        onChange={handleChange}
                        placeholder="Enter Story Thumbnail URL"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <Field
                        as={StoryTitleTextField}
                        name="category"
                        onChange={handleChange}
                        placeholder="Enter Category"
                      />
                    </div>
                    <div className="text-center">
                      <Button
                        colorScheme="blue"
                        onClick={() => handleSubmit()}
                        className="mt-4"
                      >
                        Save
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  };

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
                        author: user,
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
