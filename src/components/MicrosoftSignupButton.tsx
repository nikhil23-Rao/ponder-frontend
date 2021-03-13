// Modules Imported For Use
import React from "react";
import "../styles/Register.css";

// Microsoft Signup Button
export const MicrosoftSignupButton = () => {
  return (
    <button
      className="btn btn-lg btn-primary btn-block text-uppercase"
      type="submit"
    >
      <i className="fa fa-windows mr-2 fa-lg"></i> Sign up with Microsoft
    </button>
  );
};
