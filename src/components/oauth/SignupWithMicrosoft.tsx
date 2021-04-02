import React from "react";
import { useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";
import MicrosoftLogin from "react-microsoft-login";
import { OAUTH_REGISTER_USER } from "../../apollo/Mutations";
import { MicrosoftSignupButton } from "./MicrosoftSignupButton";
import { GenerateStoryID } from "../../utils/GenerateStoryId";

export const SignupWithMicrosoft = () => {
  const toast = useToast();
  const [OAuthRegister] = useMutation(OAUTH_REGISTER_USER, {
    onCompleted: ({ OAuthRegister: jwt }) => {
      localStorage.setItem("token", jwt);
      window.location.href = "/home";
    },
    onError: (err) => {
      return toast({
        title: err.message,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    },
  });
  const onSuccess = (err: any, data: any) => {
    const id = GenerateStoryID(24);
    OAuthRegister({
      variables: {
        username: data.account.name,
        email: data.account.userName,
        id,
      },
    });
  };

  return (
    <MicrosoftLogin
      clientId="c2b07c10-b196-4e60-87ca-b8c57ebde171"
      authCallback={onSuccess}
      children={<MicrosoftSignupButton />}
      redirectUri="http://localhost:3000/login"
    />
  );
};
