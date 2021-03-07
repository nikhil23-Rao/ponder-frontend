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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-google mr-3"
                viewBox="0 0 16 16"
                style={{ display: "inline", marginBottom: "0.8" }}
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>{" "}
              Sign up with Google
            </button>
          )}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </React.Fragment>
  );
};
