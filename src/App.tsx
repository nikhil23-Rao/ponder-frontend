import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { CreateStory } from "./components/CreateStory";
import { MyStories } from "./components/MyStories";
import { NotFound } from "./components/Not-Found";
import { LandingPage } from "./components/LandingPage";

function App() {
  return (
    <React.Fragment>
      <ToastContainer draggable={true} />
      <Switch>
        <Route path="/404-not-found" component={NotFound} />
        <Route path="/create-story" exact component={CreateStory} />
        <Route path="/my-stories" exact component={MyStories} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/404-not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
