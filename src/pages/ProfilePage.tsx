import * as React from "react";
import "../styles/Profile.css";
import Avatar from "react-avatar-edit";
import { getCurrentUser } from "../utils/getCurrentUser";
import EditIcon from "@material-ui/icons/Edit";
import { IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { UPDATE_PROFILE } from "../apollo/Mutations";

export const Profile = () => {
  const [preview, setPreview] = React.useState<any>(null);
  const [, setSrc] = React.useState("");
  const [bio, setBio] = React.useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose: onModalClose } = useDisclosure();
  const [UpdateProfile] = useMutation(UPDATE_PROFILE);

  // State For User
  const [user, setUser] = React.useState<any>({});

  React.useEffect(() => {
    // Get User
    const user: any = getCurrentUser();
    // Store User In State
    setUser(user);
    setSrc(user.image_url);

    if (user) {
      setBio(user.bio);
    }

    console.log(user);
  }, []);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview: any) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem: any) => {
    if (elem.target.files[0].size > 71680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const handleSave = async () => {
    console.log(user.image_url);
    console.log(user.bio);
    await UpdateProfile({
      variables: {
        authorid: user.id,
        bio,
        image_url: preview ? preview : user.image_url,
      },
    });
    onModalClose();
    toast({
      title: "Updated Profile. Changes May Take Some Time To Update.",
      status: "success",
      position: "top-right",
      isClosable: true,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onModalClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Avatar
              width={380}
              height={295}
              onCrop={onCrop}
              onClose={onClose}
              label="Pick A Picture"
              onBeforeFileLoad={onBeforeFileLoad}
              src={user.image_url}
            />
            {preview && (
              <div
                style={{
                  marginLeft: "35%",
                  width: "100%",
                  position: "fixed",
                  top: 150,
                }}
              >
                <h1
                  style={{
                    marginLeft: "2%",
                    fontSize: "24pt",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Preview
                </h1>
                <br />
                <div
                  style={{
                    width: 200,
                    height: 200,
                    position: "fixed",
                    right: 377,
                  }}
                >
                  <img src={preview} alt="" />
                </div>
              </div>
            )}
            <br />
            <Textarea
              placeholder="Update Your Bio Here..."
              onChange={(e) => setBio(e.currentTarget.value)}
              value={bio}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button
              variant="outline"
              colorScheme="twitter"
              onClick={handleSave}
            >
              Save Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="wrapper">
        <div className="profile-card js-profile-card">
          <div className="topright">
            <IconButton onClick={onOpen}>
              <EditIcon fontSize="large" />
            </IconButton>
          </div>
          <div className="profile-card__img">
            <img src={user.image_url} alt="profile card" />
          </div>

          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">{user.username}</div>
            <div className="profile-card__txt">{user.bio}</div>
            <div className="profile-card-loc">
              <span className="profile-card-loc__icon">
                <svg className="icon"></svg>
              </span>
            </div>

            <div className="profile-card-inf">
              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">1598</div>
                <div className="profile-card-inf__txt">Followers</div>
              </div>

              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">65</div>
                <div className="profile-card-inf__txt">Following</div>
              </div>

              <div className="profile-card-inf__item">
                <div className="profile-card-inf__title">123</div>
                <div className="profile-card-inf__txt">Stories</div>
              </div>
            </div>

            <div className="profile-card__overlay js-message-close"></div>
          </div>
        </div>
      </div>

      <svg>
        <defs>
          <symbol id="icon-location" viewBox="0 0 32 32">
            <title>location</title>
            <path d="M16 31.68c-0.352 0-0.672-0.064-1.024-0.16-0.8-0.256-1.44-0.832-1.824-1.6l-6.784-13.632c-1.664-3.36-1.568-7.328 0.32-10.592 1.856-3.2 4.992-5.152 8.608-5.376h1.376c3.648 0.224 6.752 2.176 8.608 5.376 1.888 3.264 2.016 7.232 0.352 10.592l-6.816 13.664c-0.288 0.608-0.8 1.12-1.408 1.408-0.448 0.224-0.928 0.32-1.408 0.32zM15.392 2.368c-2.88 0.192-5.408 1.76-6.912 4.352-1.536 2.688-1.632 5.92-0.288 8.672l6.816 13.632c0.128 0.256 0.352 0.448 0.64 0.544s0.576 0.064 0.832-0.064c0.224-0.096 0.384-0.288 0.48-0.48l6.816-13.664c1.376-2.752 1.248-5.984-0.288-8.672-1.472-2.56-4-4.128-6.88-4.32h-1.216zM16 17.888c-3.264 0-5.92-2.656-5.92-5.92 0-3.232 2.656-5.888 5.92-5.888s5.92 2.656 5.92 5.92c0 3.264-2.656 5.888-5.92 5.888zM16 8.128c-2.144 0-3.872 1.728-3.872 3.872s1.728 3.872 3.872 3.872 3.872-1.728 3.872-3.872c0-2.144-1.76-3.872-3.872-3.872z"></path>
            <path d="M16 32c-0.384 0-0.736-0.064-1.12-0.192-0.864-0.288-1.568-0.928-1.984-1.728l-6.784-13.664c-1.728-3.456-1.6-7.52 0.352-10.912 1.888-3.264 5.088-5.28 8.832-5.504h1.376c3.744 0.224 6.976 2.24 8.864 5.536 1.952 3.36 2.080 7.424 0.352 10.912l-6.784 13.632c-0.32 0.672-0.896 1.216-1.568 1.568-0.48 0.224-0.992 0.352-1.536 0.352zM15.36 0.64h-0.064c-3.488 0.224-6.56 2.112-8.32 5.216-1.824 3.168-1.952 7.040-0.32 10.304l6.816 13.632c0.32 0.672 0.928 1.184 1.632 1.44s1.472 0.192 2.176-0.16c0.544-0.288 1.024-0.736 1.28-1.28l6.816-13.632c1.632-3.264 1.504-7.136-0.32-10.304-1.824-3.104-4.864-5.024-8.384-5.216h-1.312zM16 29.952c-0.16 0-0.32-0.032-0.448-0.064-0.352-0.128-0.64-0.384-0.8-0.704l-6.816-13.664c-1.408-2.848-1.312-6.176 0.288-8.96 1.536-2.656 4.16-4.32 7.168-4.512h1.216c3.040 0.192 5.632 1.824 7.2 4.512 1.6 2.752 1.696 6.112 0.288 8.96l-6.848 13.632c-0.128 0.288-0.352 0.512-0.64 0.64-0.192 0.096-0.384 0.16-0.608 0.16zM15.424 2.688c-2.784 0.192-5.216 1.696-6.656 4.192-1.504 2.592-1.6 5.696-0.256 8.352l6.816 13.632c0.096 0.192 0.256 0.32 0.448 0.384s0.416 0.064 0.608-0.032c0.16-0.064 0.288-0.192 0.352-0.352l6.816-13.664c1.312-2.656 1.216-5.792-0.288-8.352-1.472-2.464-3.904-4-6.688-4.16h-1.152zM16 18.208c-3.424 0-6.24-2.784-6.24-6.24 0-3.424 2.816-6.208 6.24-6.208s6.24 2.784 6.24 6.24c0 3.424-2.816 6.208-6.24 6.208zM16 6.4c-3.072 0-5.6 2.496-5.6 5.6 0 3.072 2.528 5.6 5.6 5.6s5.6-2.496 5.6-5.6c0-3.104-2.528-5.6-5.6-5.6zM16 16.16c-2.304 0-4.16-1.888-4.16-4.16s1.888-4.16 4.16-4.16c2.304 0 4.16 1.888 4.16 4.16s-1.856 4.16-4.16 4.16zM16 8.448c-1.952 0-3.552 1.6-3.552 3.552s1.6 3.552 3.552 3.552c1.952 0 3.552-1.6 3.552-3.552s-1.6-3.552-3.552-3.552z"></path>
          </symbol>
        </defs>
      </svg>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      ></div>
    </>
  );
};
