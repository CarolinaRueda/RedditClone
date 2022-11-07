import { configureStore } from "@reduxjs/toolkit";
import AppReducer from "../app/AppSlice";

export const store = configureStore({
  reducer: {
    app: AppReducer,
  },
});
