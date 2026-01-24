// src/services/ELEVE.ts

import axios from "axios";
import { API_BASE_URL } from "../config";

// Fonction pour construire l'URL complète pour un endpoint donné
const ApiUrl = (endpoint: string) => `${API_BASE_URL}/${endpoint}`;

// Get Listes présences
export const getListPresence = async () => {
  try {
    const response = await axios.get(ApiUrl("presences"));
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du list présences", error);
    throw error;
  }
};


/* GET */
export const getEtudiants = async () => {
  const { data } = await axios.get(ApiUrl("etudiants"));
  console.log(data);
  
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
  const { data } = await axios.post(ApiUrl("etudiants"), payload);
  return data;
};

//stat
export const GetNumber =async()=>{
    try{
const response = await axios.get(ApiUrl("eleveNumber") )
   return response.data;
    } catch(error){
  console.error("Erreur lors de la récuperation du nombre eleves", error);
    throw error;
    }
    
}