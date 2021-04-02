import React from "react";
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

function App() {
  return (
    <React.Fragment>
      <ToastContainer draggable={true} />
      <Switch>
        <Route
          path="/my-stories/sortby/drafts"
          exact
          component={SortByDrafts}
        />
        <Route
          path="/my-stories/sortby/published"
          exact
          component={SortByPublished}
        />
        <Route path="/404-not-found" component={NotFound} />
        <Route path="/create-story" exact component={CreateStory} />
        <Route path="/my-stories/all" exact component={MyStories} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/stories/today" exact component={TodaysStories} />
        <Route path="/read/story/:id" exact component={ReadStory} />
        <Route path="/edit/draft/:id" exact component={EditDraft} />
        <Route path="/search" exact component={Search} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/" exact component={LandingPage} />
        <Redirect to="/404-not-found" />
      </Switch>
    </React.Fragment>
  );
}

export default App;
