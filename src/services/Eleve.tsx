const API_URL = "http://127.0.0.1:8000";
import axios from "axios";

export const ElevGet = async () => {
  try {
    const response = await axios.get(`${API_URL}/eleveLists`)
    return response.data
  } catch (error) {
    console.error("Erreur lors de la récupération des eleves", error);
    throw error;
  }
}
export const createEleve = async (
  name: string,
  cours: string,
  statut: string,
  heureEntree: string,
  heureSortie: string
) => {
  try {
    const response = await axios.post(`${API_URL}/eleveCreate`, {
      name,
      cours,
      statut,
      heureEntree,
      heureSortie,
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'élève :", error);
    throw error;
  }
};