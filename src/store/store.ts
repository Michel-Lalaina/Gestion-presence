// src/store/store.ts

import { configureStore } from "@reduxjs/toolkit";
import seanceReducer from "./seanceSlice";
import studentsFilterReducer from "./filterEleveSlice";
import emptyDataSeanceReducer from "./emptyDataSeanceSlice";
export const store = configureStore({
  reducer: {
    seance_store: seanceReducer,
    students_filter_store: studentsFilterReducer, 
        emptyDataSeance:
      emptyDataSeanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;