// Modules Imported For Use
import React from "react";
import "../../styles/MicrosoftButton.css";

// Render Microsoft Login Button
export const MicrosoftLoginButton = () => {
  return (
    <button
      className="btn btn-lg btn-primary btn-block text-uppercase"
      type="submit"
    >
      <i className="fa fa-windows fa-lg mr-2"></i> Sign in with Microsoft
    </button>
  );
};
