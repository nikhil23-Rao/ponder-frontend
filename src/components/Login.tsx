import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import "../styles/Field.css";
import "../styles/HorizontalLine.css";
import { LOGIN_USER } from "../apollo/Mutations";
import { LoginValidationTextField } from "../validation/LoginValidationTextField";
import { LoginValidationPasswordTextField } from "../validation/LoginValidationPasswordTextField";
import { LoginValidationSchema } from "../validation/LoginValidationSchema";
import { Link } from "react-router-dom";
import { InvalidTextField } from "../validation/InvalidTextField";
import { LoginWithGoogle } from "../oauth/LoginWithGoogle";
import { LoginWithMicrosoft } from "../oauth/LoginWithMicrosoft";

export const Login = (props: any) => {
  const [Login] = useMutation(LOGIN_USER, {
    onCompleted: ({ Login: jwt }) => {
      localStorage.setItem("token", jwt);
      props.history.push("/home");
    },
    onError: (err) => {
      setError(true);
    },
  });

  const [error, setError] = useState(false);

  return (
    <React.Fragment>
      <Formik
        initialValues={{ Email: "", Password: "" }}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          setSubmitting(true);
          Login({
            variables: {
              password: values.Password,
              email: values.Email,
            },
          });
        }}
        validationSchema={LoginValidationSchema}
      >
        {({ handleSubmit, isSubmitting }) => (
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card card-signin flex-row my-5">
                  <div className="card-img-left d-none d-md-flex"></div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Login</h5>
                    <Form className="form-signin" onSubmit={handleSubmit}>
                      <div style={{ textAlign: "center" }}>
                        {error ? (
                          <Field
                            as={InvalidTextField}
                            placeholder="Enter Email..."
                            name="Email"
                            type="text"
                          />
                        ) : (
                          <Field
                            as={LoginValidationTextField}
                            name="Email"
                            placeholder="Enter Email..."
                          />
                        )}
                      </div>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <Field
                          as={LoginValidationPasswordTextField}
                          name="Password"
                          placeholder="Enter Password..."
                        />
                      </div>

                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase mt-5"
                        onClick={() => handleSubmit()}
                        type="submit"
                      >
                        Login
                      </button>
                      <Link
                        className="d-block text-center mt-2 small"
                        to="/signup"
                      >
                        Don't Have An Account? Create One Here
                      </Link>
                      <hr className="my-4" />

                      <LoginWithGoogle />
                      <br />
                      <LoginWithMicrosoft />
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </React.Fragment>
  );
};
