import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../styles/editor.css";
import {
  SAVE_DRAFT_CONTENT,
  SAVE_DRAFT_TITLE_AND_IMAGEURL,
} from "../apollo/Mutations";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { StoryTitleTextField } from "../validation/StoryTitleTextField";
import { StoryValidationSchema } from "../validation/StoryValidationSchema";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export const CreateStory = () => {
  const [publish, setPublish] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);

  const handleEditorChange = (content: any, editor: any) => {
    console.log("Content was updated:", content);
    console.log(typeof content);
  };

  const [SaveDraftContent] = useMutation(SAVE_DRAFT_CONTENT);
  const [SaveDraftTitleAndImageUrl] = useMutation(
    SAVE_DRAFT_TITLE_AND_IMAGEURL
  );

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
                initialValues={{ title: "", image_url: "" }}
                onSubmit={(values) => {
                  console.log(values);
                  SaveDraftTitleAndImageUrl({
                    variables: {
                      id: 1,
                      title: values.title,
                      image_url: values.image_url,
                    },
                  });
                  setSaveDraft(false);
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
                        placeholder="Enter Story Image"
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

  return (
    <React.Fragment>
      {saveDraft && SaveDraftModal()}
      <div>
        <Editor
          initialValue="<h1 style='text-align:center;'>(Once You Save Your Title Will Be Here)</h1><p style='text-align:center;'></p>"
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
            toolbar: "Publish | SaveDraft",
            quickbars_insert_toolbar:
              "quicktable image media codesample formatselect fontsizeselect forecolor backcolor |  alignleft aligncenter alignright",
            quickbars_selection_toolbar:
              "bold underline italic link fontsizeselect |  alignleft aligncenter alignright",
            setup: (editor) => {
              if (!publish) {
                editor.ui.registry.addButton("SaveDraft", {
                  text: "Save As Draft",
                  icon: "document-properties",
                  onAction: (_) => {
                    console.log("Saved As Draft");
                    if (saveDraft === false) {
                      setSaveDraft(true);
                    }
                    // Save Draft To DB
                    const content = editor.getContent();
                    SaveDraftContent({ variables: { content } });
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
          disabled={publish}
        />
      </div>
    </React.Fragment>
  );
};
