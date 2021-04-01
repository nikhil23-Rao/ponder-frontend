// Modules Imported For Use
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

const createHistory = require("history").createBrowserHistory;

// Create New Apollo Client
const client: ApolloClient<object> = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    dataIdFromObject: (o) =>
      o.id ? `${o.__typename}-${o.id}` : `${o.__typename}-${o.cursor}`,
  }),
});

export const history = createHistory({ forceRefresh: true });

// Render React DOM
ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <App />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById("root")
);
