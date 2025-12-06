// src/services/presenceService.ts
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";


export const getListPresence = async () => {
  try {
    const response = await axios.get(`${API_URL}/presenceLists`); // Remplacez par l'URL de votre backend
    return response.data; // On suppose que le backend renvoie { question, options, quizId }
  } catch (error) {
    console.error("Erreur lors de la récupération des eleves", error);
    throw error;
  }
};

export const createEleve = async (name: string, cours: string, statut: string) => {
  try {
    const response = await axios.post(`${API_URL}/elevCreat`, { name, cours, statut });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout du quiz", error);
    throw error;
  }
};