import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store/store";
import Main from "./containers/Main";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={4}>
      <BrowserRouter>
        <Route path="/" component={Main} />
      </BrowserRouter>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("app")
);
