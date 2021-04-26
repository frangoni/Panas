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
  created: true,
  singleService: {},
};

const service = createReducer(initialState, {
  [createService.fulfilled]: (state, action) => {
    console.log("action :", action);
    if (action.payload) return { ...state, created: true, singleService: action.payload };
    else return { ...state, created: false };
  },
});

export default service;
