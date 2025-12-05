// src/services/presenceService.ts
export interface Presence {
  id: number;
  name: string;
  avatar: string;
  cours: string;
  entree: string;
  sortie: string;
  statut: string;
}
import axios from "axios"

const presenceData: Presence[] = [
  {
    id: 1,
    name: "Léa Dubois",
    avatar: "https://i.pravatar.cc/150?img=32",
    cours: "Développement Web",
    entree: "09:02",
    sortie: "11:58",
    statut: "Présent",
  },
  {
    id: 2,
    name: "Marc Petit",
    avatar: "https://i.pravatar.cc/150?img=15",
    cours: "Bases de Données",
    entree: "-",
    sortie: "-",
    statut: "Absent",
  },
  {
    id: 3,
    name: "Chloé Martin",
    avatar: "https://i.pravatar.cc/150?img=45",
    cours: "Développement Web",
    entree: "09:12",
    sortie: "12:01",
    statut: "Retard",
  },
  {
    id: 4,
    name: "Hugo Bernard",
    avatar: "https://i.pravatar.cc/150?img=27",
    cours: "Réseaux Informatiques",
    entree: "14:00",
    sortie: "16:45",
    statut: "Présent",
  },
  {
    id: 5,
    name: "Alice Fournier",
    avatar: "https://i.pravatar.cc/150?img=18",
    cours: "Bases de Données",
    entree: "09:05",
    sortie: "11:55",
    statut: "Présent",
  },
];

// Simule un appel API GET /presence
export function fetchPresence(): Promise<Presence[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(presenceData);
    }, 800); // 800ms comme un vrai appel réseau
  });
}
export async function fetchPresenceApi(): Promise<Presence[]> {
  const res = await axios.get("/api/presenceList"); 
  return res.data;
}