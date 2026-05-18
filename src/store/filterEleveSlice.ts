// src/store/studentsFilterSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StudentsFilterState {
  mention: string;
  parcours: string;
  niveau: string;
}

const initialState: StudentsFilterState = {
  mention: "",
  parcours: "",
  niveau: "",
};

const studentsFilterSlice = createSlice({
  name: "students_filter_store",
  initialState,
  reducers: {
    setStudentsFilter: (
      state,
      action: PayloadAction<Partial<StudentsFilterState>>
    ) => {
      Object.assign(state, action.payload);
    },

    setMention: (state, action: PayloadAction<string>) => {
      state.mention = action.payload;
      state.parcours = ""; // reset automatique
    },

    setParcours: (state, action: PayloadAction<string>) => {
      state.parcours = action.payload;
    },

    setNiveau: (state, action: PayloadAction<string>) => {
      state.niveau = action.payload;
    },

    clearStudentsFilter: () => {
      return initialState;
    },
  },
});

export const {
  setStudentsFilter,
  setMention,
  setParcours,
  setNiveau,
  clearStudentsFilter,
} = studentsFilterSlice.actions;

export default studentsFilterSlice.reducer;