// Modules Imported For Use
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/getCurrentUser";
import "../styles/HomePage.css";
import "../styles/Positions.css";
import "../styles/logo.css";
import Sidebar from "../components/Sidebar";
import { Dropdown } from "react-bootstrap";
import { logout } from "../utils/logout";
import { history } from "../index";

// Home Component (Renders What Is On The Home Page)
export const Home = () => {
  // State For User
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    // Get User
    const user = getCurrentUser();
    // Store User In State
    setUser(user);
    console.log(user);
  }, []);

  return (
    <React.Fragment>
      <Sidebar />
      <div className="topright">
        <Dropdown>
          <Dropdown.Toggle
            className="rounded-circle"
            style={{
              backgroundColor: "#fff",
              borderColor: "#fff",
              outline: "none",
              outlineColor: "#fff",
              boxShadow: "none",
            }}
            id="dropdown-basic"
          >
            <img
              className="topright rounded-circle undraggable clickable"
              src={user.image_url}
              alt=""
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              onClick={() => history.push("/profile/me")}
            >
              Profile
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </React.Fragment>
  );
};
