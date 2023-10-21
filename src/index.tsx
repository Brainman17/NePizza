import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { REPO_NAME } from "./constants/repo";

// const root = ReactDOM.createRoot(
//   document.getElementById("root")
// );
const rootElem = document.getElementById("root");

if (rootElem) {
  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <BrowserRouter basename={`/${REPO_NAME}/`}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}
