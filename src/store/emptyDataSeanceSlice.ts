import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Student {
  id?: number;

  matricule: string;

  nom: string;
  prenom: string;
  statut: string;
  niveau?: string;
  parcours?: string;
  heure_entree?: string | null;

  heure_sortie?: string | null;

}

interface EmptyDataSeanceState {
  data: Student[];
}

const initialState: EmptyDataSeanceState = {
  data: [],
};

const emptyDataSeanceSlice = createSlice({
  name: "emptyDataSeance",

  initialState,

  reducers: {

    // remplacer toute la liste
    setEmptyDataSeance: (
      state,
      action: PayloadAction<Student[]>
    ) => {
      state.data = action.payload;
    },

    // ajouter un étudiant
    addStudentToSeance: (
      state,
      action: PayloadAction<Student>
    ) => {
      state.data.push(action.payload);
    },

    // supprimer par matricule
    removeStudentFromSeance: (
      state,
      action: PayloadAction<string>
    ) => {
      state.data = state.data.filter(
        (s) => s.matricule !== action.payload
      );
    },

    // vider
    clearEmptyDataSeance: (state) => {
      state.data = [];
    },
  },
});

export const {
  setEmptyDataSeance,
  addStudentToSeance,
  removeStudentFromSeance,
  clearEmptyDataSeance,
} = emptyDataSeanceSlice.actions;

export default emptyDataSeanceSlice.reducer;