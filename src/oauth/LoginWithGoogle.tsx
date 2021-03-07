import React from "react";
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "react-google-login";
import { OAUTH_LOGIN_USER } from "../apollo/Mutations";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export const LoginWithGoogle = (props: any) => {
  const [OAuthLogin] = useMutation(OAUTH_LOGIN_USER, {
    onCompleted: ({ OAuthLogin: jwt }) => {
      localStorage.setItem("token", jwt);
      window.location.href = "/home";
    },
    onError: (err) => {
      console.log(err.message);
      return toast.error("Invalid Google Login.");
    },
  });
  const response = (res: any) => {
    OAuthLogin({
      variables: {
        email: res.profileObj.email,
      },
    });
  };

  return (
    <React.Fragment>
      <div>
        <GoogleLogin
          clientId="416696687793-5s7e6nibp3k96a1rjbp25mmjlbice5l0.apps.googleusercontent.com"
          cookiePolicy={"single_host_origin"}
          onSuccess={response}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              className="btn btn-lg btn-danger btn-block text-uppercase"
            >
              <i className="fa fa-google mr-2"></i> Sign in with Google
            </button>
          )}
        />
      </div>
    </React.Fragment>
  );
};
