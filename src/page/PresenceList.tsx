import {
  Button,
  TextField,
  MenuItem,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
import { useEffect, useState } from "react";

const statusColors: Record<string, string> = {
  Présent: "bg-green-600 text-white",
  Absent: "bg-red-500 text-white",
  Retard: "bg-yellow-500 text-white",
};

interface Presence {

  id: number;
  name: string;
  avatar: string;
  cours: string;
  date: string;
  entree: string;
  sortie: string;
  statut: string;
}

// ---- SIMULE API ----
const fakePresence: Presence[] = [
  {
    id: 1,
    name: "Léa Dubois",
    avatar: "https://i.pravatar.cc/150?img=32",
    cours: "Développement Web",
    date: "2025-10-14",
    entree: "09:02",
    sortie: "11:58",
    statut: "Retard",
  },
  {
    id: 2,
    name: "Marc Petit",
    avatar: "https://i.pravatar.cc/150?img=15",
    cours: "Bases de Données",
    date: "2025-10-14",
    entree: "-",
    sortie: "-",
    statut: "Absent",
  },
  {
    id: 3,
    name: "Chloé Martin",
    avatar: "https://i.pravatar.cc/150?img=45",
    cours: "Développement Web",
    date: "2025-10-13",
    entree: "10:30",
    sortie: "10:45",
    statut: "Sortie urgence",
  },
];


export function fetchPresence(): Promise<Presence[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fakePresence), 800);
  });
}

// ------------------- COMPONENT ----------------------


export default function PresenceList() {
  const [data, setData] = useState<Presence[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetchPresence().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-xl">
        Chargement...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-10 py-8">
      {/* TITLE */}
      <h1 className="text-4xl font-extrabold mb-8">Liste des Absences et retards</h1>

      {/* FILTER BAR */}
      <div className="w-full bg-white rounded-xl shadow p-5 flex flex-wrap gap-3 items-center mb-8">
        <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2 w-64">
          <SearchIcon className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Rechercher un étudiant"
            className="bg-transparent outline-none w-full"
          />
        </div>

        <TextField
          select
          label="Filtrer par cours"
          size="small"
          className="bg-gray-100 rounded-xl"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="web">Développement Web</MenuItem>
          <MenuItem value="bdd">Bases de Données</MenuItem>
        </TextField>

        <TextField
          select
          label="Filtrer par date"
          size="small"
          className="bg-gray-100 rounded-xl"
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="today">Aujourd'hui</MenuItem>
          <MenuItem value="yesterday">Hier</MenuItem>
        </TextField>

        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          className="normal-case ml-auto"
        >
          Exporter en PDF
        </Button>

        <Button
          variant="contained"
          startIcon={<GridOnIcon />}
          className="normal-case bg-green-600 hover:bg-green-700"
        >
          Exporter en Excel
        </Button>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2">
          <span className="text-xl">＋</span>  Scanner presence
        </button>

      </div>


      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-600 text-left text-sm">
            <tr>
              <th className="py-4 px-6">Étudiant</th>
               <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Cours</th>
              <th className="py-4 px-6">Heure d’entrée</th>
              <th className="py-4 px-6">Heure de sortie</th>
              <th className="py-4 px-6">Statut</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                <td className="py-4 px-6 flex items-center gap-3">
                  <Avatar src={row.avatar} />
                  <span className="font-medium">{row.name}</span>
                </td>
  <td className="py-4 px-6">{row.date}</td>
                <td className="py-4 px-6">{row.cours}</td>
                <td className="py-4 px-6">{row.entree}</td>
                <td className="py-4 px-6">{row.sortie}</td>

                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${statusColors[row.statut]}`}
                  >
                    {row.statut}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
