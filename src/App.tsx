import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { CreateStory } from "./components/CreateStory";
import { MyStories } from "./components/MyStories";

function App() {
  return (
    <React.Fragment>
      <ToastContainer draggable={true} />
      <Switch>
        <Route path="/create-story" exact component={CreateStory} />
        <Route path="/my-stories" exact component={MyStories} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
