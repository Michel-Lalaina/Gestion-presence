const API_URL = "http://127.0.0.1:8000";
import axios from "axios";

export const GetNumber =async()=>{
    try{
const response = await axios.get(`${API_URL}/eleveNumber`)
   return response.data;
    } catch(error){
  console.error("Erreur lors de la rec du nombre", error);
    throw error;
    }

}