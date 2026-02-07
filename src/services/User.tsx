import axios from "axios";
import { API_BASE_URL } from "../config";

const ApiUrl = (endpoint: string) => `${API_BASE_URL}/${endpoint}`;

// Récupérer la liste des utilisateurs
export const getListUsers = async () => {
  try {
    const response = await axios.get(ApiUrl("users"));
    return response.data; // attend un tableau d'utilisateurs
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs", error);
    throw error;
  }
};

// Créer un nouvel utilisateur
export const createUser = async (payload: {
  noms: string;
  tel: string;
  role: string;
  email: string;
}) => {
  try {
    const { data } = await axios.post(ApiUrl("users"), payload);
    return data;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur", error);
    throw error;
  }
};

// Mettre à jour un utilisateur existant
export const updateUser = async (id: number, payload: {
  firstname: string;
  lastname: string;
  tel: string;
  role: string;
  email: string;
}) => {
  try {
    const { data } = await axios.put(ApiUrl(`users/${id}`), payload);
    return data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur", error);
    throw error;
  }
};

// Supprimer un utilisateur
export const deleteUser = async (id: number) => {
  try {
    const { data } = await axios.delete(ApiUrl(`users/${id}`));
    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
    throw error;
  }
};
