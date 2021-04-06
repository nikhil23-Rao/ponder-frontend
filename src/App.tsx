import React, { useEffect, useState } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home } from "./pages/HomePage";
import { Login } from "./pages/LoginPage";
import { Signup } from "./pages/SignupPage";
import { CreateStory } from "./pages/CreateStoryPage";
import { MyStories } from "./pages/MyStoriesPage";
import { NotFound } from "./pages/NotFoundPage";
import { LandingPage } from "./pages/LandingPage";
import { SortByDrafts } from "./pages/SortByDraftsPage";
import { SortByPublished } from "./pages/SortByPublishedPage";
import { ReadStory } from "./pages/ReadStoryPage";
import { TodaysStories } from "./pages/TodaysStoriesPage";
import { EditDraft } from "./pages/EditDraftPage";
import { Search } from "./pages/SearchPage";
import { MyProfile } from "./pages/MyProfilePage";
import { Profile } from "./pages/ProfilePage";

function App() {
  const [jwt, setJwt] = useState<any>();
  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setJwt(jwt);
  }, []);
  return (
    <React.Fragment>
      <ToastContainer draggable={true} />
      <Switch>
        <Route
          path="/my-stories/sortby/drafts"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <SortByDrafts {...props} />;
          }}
        />
        <Route
          path="/my-stories/sortby/published"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <SortByPublished {...props} />;
          }}
        />
        <Route path="/404-not-found" component={NotFound} />
        <Route
          path="/create-story"
          exact
          render={() => {
            if (jwt === null) return <Redirect to="/login" />;
            return <CreateStory />;
          }}
        />
        <Route
          path="/my-stories/all"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <MyStories {...props} />;
          }}
        />
        <Route
          path="/signup"
          exact
          render={(props) => {
            if (jwt !== null) return <Redirect to="/home" />;
            if (jwt === null) {
              return <Signup {...props} />;
            }
          }}
        />
        <Route
          path="/stories/today"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <TodaysStories {...props} />;
          }}
        />
        <Route
          path="/read/story/:id"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <ReadStory {...props} />;
          }}
        />
        <Route
          path="/profile/:id"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <Profile {...props} />;
          }}
        />
        <Route
          path="/edit/draft/:id"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <EditDraft {...props} />;
          }}
        />
        <Route
          path="/me"
          exact
          component={MyProfile}
          render={() => {
            if (jwt === null) return <Redirect to="/login" />;
            return <MyProfile />;
          }}
        />
        <Route
          path="/search"
          exact
          render={(props) => {
            if (jwt === null) return <Redirect to="/login" />;
            return <Search {...props} />;
          }}
        />
        <Route
          path="/login"
          exact
          render={(props) => {
            if (jwt !== null) return <Redirect to="/home" />;
            return <Login {...props} />;
          }}
        />
        <Route
          path="/home"
          exact
          render={() => {
            if (jwt === null) return <Redirect to="/login" />;
            return <Home />;
          }}
        />
        <Route path="/" component={LandingPage} />
        <Redirect to="/404-not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
