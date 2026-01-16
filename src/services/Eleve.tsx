import axios from "axios";
import { API_BASE_URL } from "../../config"; // ← on importe l'URL de config

// Fonction pour construire l'URL complète pour un endpoint donné
const getApiUrl = (endpoint: string) => `${API_BASE_URL}/${endpoint}`;

/* GET Etudiants */
export const getEtudiants = async () => {
  const { data } = await axios.get(getApiUrl("etudiants"));
  return data;
};

/* POST Etudiant */
export const createEtudiant = async (payload: {
  matricule: string;
  nom: string;
  prenom: string;
  date_naissance: string;
  mention: string;
  parcours: string;
  niveau: string;
}) => {
  const { data } = await axios.post(getApiUrl("etudiants"), payload);
  return data;
};
