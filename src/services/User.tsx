// src/services/useur.ts

import axios from "axios";
import { API_BASE_URL } from "../config";

const ApiUrl = (endpoint: string) => `${API_BASE_URL}/${endpoint}`;


export const getListUsers = async () => {
  try {
    const response = await axios.get(ApiUrl("users"));
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du list présences", error);
    throw error;
  }
};

export const createUser = async(payload: {
  noms: string;
  tel: string;
  role: string;
  email: string;
})=>{
  const{data} = await axios.post(ApiUrl("users"), payload);
  return data;
};