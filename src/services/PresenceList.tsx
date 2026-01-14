// src/services/presenceService.ts
import axios from "axios";
const API_URL = "http://localhost:8000/api" ; //URL not true


export const getListPresence = async () => {
  try {
    const response = await axios.get(`${API_URL}/presences`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du list", error);
    throw error;
  }
};


