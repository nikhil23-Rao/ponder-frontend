// Modules Imported For Use
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { SignupValidationTextField } from "../components/validation/SignupValidationTextField";
import "../styles/Field.css";
import "../styles/HorizontalLine.css";
import { SignupValidationSchema } from "../components/validation/SignupValidationSchema";
import { SignupValidationPasswordTextField } from "../components/validation/SignUpValidationPasswordTextField";
import { REGISTER_USER } from "../apollo/Mutations";
import { Link } from "react-router-dom";
import { AccountExistsTextField } from "../components/validation/AccountExistsTextField";
import { SignupWithGoogle } from "../components/oauth/SignupWithGoogle";
import { SignupWithMicrosoft } from "../components/oauth/SignupWithMicrosoft";
import "../styles/Register.css";
import { GenerateStoryID } from "../utils/GenerateStoryId";

// Signup Component
export const Signup = (props: any) => {
  const [error, setError] = useState(false);
  const [Register] = useMutation(REGISTER_USER, {
    onCompleted: ({ Register: jwt }) => {
      // Store JWT In Local Storage
      localStorage.setItem("token", jwt);
      // Push To Home Page
      props.history.push("/home");
    },
    onError: (err) => {
      // Error Then SetError To True To Show In Form
      setError(true);
    },
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={{ Username: "", Email: "", Password: "" }}
        onSubmit={(values, { resetForm }) => {
          try {
            const id = GenerateStoryID(24);
            // Try Registering If Error Log It
            Register({
              variables: {
                username: values.Username,
                password: values.Password,
                email: values.Email,
                id,
              },
            });
            // Reset Form When Done
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
                      <div
                        style={{ textAlign: "center", fontSize: "12px" }}
                        className="mt-2"
                      >
                        <p
                          style={{
                            display: "inline",
                            color: "black",
                          }}
                        >
                          Already Have An Account?
                          <Link to="/login" className="ml-1">
                            Login Here
                          </Link>
                        </p>
                      </div>
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
