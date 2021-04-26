import { configureStore } from "@reduxjs/toolkit";
import service from "./reducer/service";
import client from "./reducer/client";

const store = configureStore({
  reducer: {
    service,
    client,
  },
});

export default store;
