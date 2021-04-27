import { createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createService = createAsyncThunk("CREATE_SERVICE", (data) => {
  return axios
    .post("/api/service", data)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
});

const initialState = {
  services: [],
  created: "",
  singleService: {},
};

const service = createReducer(initialState, {
  [createService.fulfilled]: (state, action) => {
    if (action.payload) return { ...state, created: "yes", singleService: action.payload };
    else return { ...state, created: "no" };
  },
  [createService.pending]: (state) => {
    return { ...state, created: "" };
  },
});

export default service;
