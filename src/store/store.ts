// src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import seanceReducer from "./seanceSlice";
import studentsFilterReducer from "./filterEleveSlice";

export const store = configureStore({
  reducer: {
    seance_store: seanceReducer,
    students_filter_store: studentsFilterReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;