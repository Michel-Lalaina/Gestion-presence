import axios from "axios";

const API_URL = "http://localhost:8000/api/etudiants/";

/* GET */
export const getEtudiants = async () => {
  const { data } = await axios.get(API_URL);
  return data.etudiants;
};

/* POST */
export const createEtudiant = async (payload: {
  matricule: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  mention: string;
  parcours: string;
  niveau: string;
}) => {
  const { data } = await axios.post(API_URL, payload);
  return data;
};
