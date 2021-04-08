import React from "react";
import "../styles/LandingPage.css";
import logo from "../../src/img/litelogo.png";
import { history } from "../index";

export const LandingPage: React.FC<{}> = () => {
  return (
    <React.Fragment>
      <img
        style={{
          width: 150,
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        className="undraggable"
        src={logo}
        alt=""
      />
      <div className="landing-container" style={{ marginTop: "2%" }}>
        <div className="landing-card" onClick={() => history.push("/login")}>
          <span></span>
          <div className="landing-content">
            <h2>LOGIN</h2>
            <p>Welcome Back To Lite. Login To Your Account Here.</p>
          </div>
        </div>

        <div className="landing-card" onClick={() => history.push("/signup")}>
          <span></span>
          <div className="landing-content">
            <h2>SIGN UP</h2>
            <p>
              New To Lite? Create An Account Here To Read, Write, And Share
              Stories All Across The World!
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
