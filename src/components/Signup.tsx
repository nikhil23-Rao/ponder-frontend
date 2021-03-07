import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { SignupValidationTextField } from "../validation/SignupValidationTextField";
import "../styles/Field.css";
import "../styles/HorizontalLine.css";
import { SignupValidationSchema } from "../validation/SignupValidationSchema";
import { SignupValidationPasswordTextField } from "../validation/SignUpValidationPasswordTextField";
import { REGISTER_USER } from "../apollo/Mutations";
import { Link } from "react-router-dom";
import { AccountExistsTextField } from "../validation/AccountExistsTextField";
import { SignupWithGoogle } from "../oauth/SignupWithGoogle";
import { SignupWithMicrosoft } from "../oauth/SignupWithMicrosoft";
import "../styles/Register.css";

export const Signup = (props: any) => {
  const [Register] = useMutation(REGISTER_USER, {
    onCompleted: ({ Register: jwt }) => {
      localStorage.setItem("token", jwt);
      props.history.push("/home");
    },
    onError: (err) => {
      setError(true);
      console.log(err.message);
    },
  });

  const [error, setError] = useState(false);

  return (
    <React.Fragment>
      <Formik
        initialValues={{ Username: "", Email: "", Password: "" }}
        onSubmit={(values, { resetForm }) => {
          try {
            Register({
              variables: {
                username: values.Username,
                password: values.Password,
                email: values.Email,
              },
            });
            resetForm();
          } catch (err) {
            console.log(err.message);
          }
        }}
        validationSchema={SignupValidationSchema}
      >
        {({ handleSubmit }) => (
          <div className="container">
            <div className="row">
              <div className="col-lg-10 col-xl-9 mx-auto">
                <div className="card card-signin flex-row my-5">
                  <div className="card-img-left d-none d-md-flex"></div>
                  <div className="card-body">
                    <h5 className="card-title text-center">Register</h5>
                    <Form className="form-signin" onSubmit={handleSubmit}>
                      <div style={{ textAlign: "center" }}>
                        {error ? (
                          <Field
                            placeholder="Enter Email..."
                            name="Email"
                            type="text"
                            as={AccountExistsTextField}
                          />
                        ) : (
                          <Field
                            as={SignupValidationTextField}
                            name="Email"
                            placeholder="Enter Email..."
                          />
                        )}
                      </div>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <Field
                          as={SignupValidationTextField}
                          name="Username"
                          placeholder="Enter Username..."
                        />
                      </div>
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <Field
                          as={SignupValidationPasswordTextField}
                          name="Password"
                          placeholder="Enter Password..."
                        />
                      </div>
                      <button
                        className="btn btn-lg btn-primary btn-block text-uppercase mt-5"
                        onClick={() => handleSubmit()}
                        type="submit"
                      >
                        Register
                      </button>
                      <Link
                        className="d-block text-center mt-2 small"
                        to="/login"
                      >
                        Already Have An Account? Sign In Here
                      </Link>
                      <br />
                      <div className="separator">OR</div>
                      <br />
                      <SignupWithGoogle />
                      <br />
                      <SignupWithMicrosoft />
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
