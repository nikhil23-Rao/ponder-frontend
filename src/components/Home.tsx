// Modules Imported For Use
import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../utils/getCurrentUser";
import "../styles/HomePage.css";

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
      <div>Home</div>
    </React.Fragment>
  );
};
