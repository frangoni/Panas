import { configureStore } from "@reduxjs/toolkit";
import service from "./reducer/service";
import client from "./reducer/client";
import product from "./reducer/product";

const store = configureStore({
  reducer: {
    service,
    client,
    product,
  },
});

export default store;
