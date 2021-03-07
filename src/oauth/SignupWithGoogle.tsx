import React from "react";
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "react-google-login";
import { OAUTH_REGISTER_USER } from "../apollo/Mutations";
import { toast } from "react-toastify";

export const SignupWithGoogle = (props: any) => {
  const [OAuthRegister] = useMutation(OAUTH_REGISTER_USER, {
    onCompleted: ({ OAuthRegister: jwt }) => {
      localStorage.setItem("token", jwt);
      window.location.href = "/home";
      return;
    },
    onError: (err) => {
      return toast.error(err.message);
    },
  });
  const response = (res: any) => {
    OAuthRegister({
      variables: {
        username: res.profileObj.name,
        email: res.profileObj.email,
      },
    });
  };
  return (
    <React.Fragment>
      <div>
        <GoogleLogin
          clientId="416696687793-5s7e6nibp3k96a1rjbp25mmjlbice5l0.apps.googleusercontent.com"
          onSuccess={response}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="btn btn-lg btn-danger btn-block text-uppercase"
            >
              <i className="fa fa-google mr-2"></i> Sign up with Google
            </button>
          )}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </React.Fragment>
  );
};
