// src/store/seanceSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeanceState {
  id: number | null;
  cours: string;
  mention: string;
  parcours: string;
  niveau: string;
  heure_debut: string;
  heure_limite_retard: string;
  heure_fin: string;
  active: boolean;
}

const initialState: SeanceState = {
  id: null,
  cours: "",
  mention: "",
  parcours: "",
  niveau: "",
  heure_debut: "",
  heure_limite_retard: "",
  heure_fin: "",
  active: false,
};

const seanceSlice = createSlice({
  name: "seance_store",
  initialState,
  reducers: {
    setSeance: (state, action: PayloadAction<Partial<SeanceState>>) => {
      Object.assign(state, action.payload);
    },

    clearSeance: () => {
      return initialState;
    },

    closeSeance: (state) => {
      state.active = false;
    },

    openSeance: (state) => {
      state.active = true;
    },
  },
});

export const {
  setSeance,
  clearSeance,
  closeSeance,
  openSeance,
} = seanceSlice.actions;

export default seanceSlice.reducer;