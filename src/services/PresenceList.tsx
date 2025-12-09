// src/services/presenceService.ts
import axios from "axios";
const API_URL = "http://127.0.0.1:8000"; //URL not true


export const getListPresence = async () => {
  try {
    const response = await axios.get(`${API_URL}/presenceLists`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du list", error);
    throw error;
  }
};


