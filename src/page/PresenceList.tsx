import { Button, TextField, MenuItem, Avatar} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import GridOnIcon from "@mui/icons-material/GridOn";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    name: "Michelle Annicka",
    cours: "Reseaux et system",
    entree: "08:58",
    sortie: "12:00",
    date: "16/12/2025",
    avatar: "https://i.pravatar.cc/150?img=47",
    statut: "Présent",
  },
  {
    id: 3,
    name: "Marc Petit",
    avatar: "https://i.pravatar.cc/150?img=15",
    cours: "Bases de Données",
    date: "2025-10-14",
    entree: "-",
    sortie: "-",
    statut: "Absent",
  },
  {
    id: 4,
    name: "Chloé Martin",
    avatar: "https://i.pravatar.cc/150?img=45",
    cours: "Développement Web",
    date: "2025-10-13",
    entree: "10:30",
    sortie: "10:45",
    statut: "Sortie urgence",
  },
  {
    id: 5,
    name: "Aro Mampianina",
    avatar: "https://i.pravatar.cc/150?img=12",
    cours: "Développement Web",
    date: "2025-10-13",
    entree: "10:00",
    sortie: "11:45",
    statut: "Présent",
  },
    {
    id: 6,
    name: "TOKY Nomena",
    avatar:"https://i.pravatar.cc/150?img=20",
    cours: "Bases de données",
    date: "2025-10-13",
    entree: "--",
    sortie: "--",
    statut: "Absent",
  },
      {
    id: 7,
    name: "Mario",
    avatar: "https://i.pravatar.cc/150?img=5",
    cours: "Bases de données",
    date: "2025-10-13",
    entree: "10:10",
    sortie: "12:00",
    statut: "Présent",
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
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);




  useEffect(() => {
    fetchPresence().then((d) => {
      setData(d);
      setLoading(false);
    });
  }, []);

  // LOGIQUE FILTRES 

  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  const allowedStatus = ["Absent", "Retard", "Sortie urgence"];

  const filteredData = data.filter((row) => {
    // 🔹 statut
    const matchStatus =
      showAll || allowedStatus.includes(row.statut);

    const matchName = row.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCourse =
      courseFilter === "all" || row.cours === courseFilter;

    const matchDate =
      dateFilter === "all" ||
      (dateFilter === "today" && row.date === today) ||
      (dateFilter === "yesterday" && row.date === yesterday);

    return matchStatus && matchName && matchCourse && matchDate;
  });

    const handleExcel = () => {
        toast.success("Exportation pas disponible pour votre mode!");

    };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full text-xl">
        Chargement...
      </div>
    );
  }


  return (
    <div className="flex flex-col w-full px-10 py-8">
          <ToastContainer position="top-right" autoClose={5000} />
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <TextField
          select
          label="Filtrer par cours"
          size="small"
          className="bg-gray-100 rounded-xl"
          sx={{ minWidth: 180 }}
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="Développement Web">Développement Web</MenuItem>
          <MenuItem value="Bases de Données">Bases de Données</MenuItem>
        </TextField>

        <TextField
          select
          label="Filtrer par date"
          size="small"
          className="bg-gray-100 rounded-xl"
          sx={{ minWidth: 180 }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <MenuItem value="all">Tous</MenuItem>
          <MenuItem value="today">Aujourd'hui</MenuItem>
          <MenuItem value="yesterday">Hier</MenuItem>
        </TextField>


        <Button
          variant="outlined"
          startIcon={<PictureAsPdfIcon />}
          className="normal-case ml-auto"
            onClick={handleExcel}
        >
          Exporter en PDF
        </Button>

        <Button
          variant="contained"
          startIcon={<GridOnIcon />}
          className="normal-case bg-green-600 hover:bg-green-700"
           onClick={handleExcel}
        >
          Exporter en Excel
        </Button>

        <button
          onClick={() => {
            setShowAll(false); //revenir a la liste normale
            setOpenCamera(true);   //  ouvre la caméra
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <span className="text-xl">＋</span> Scanner presence
        </button>



        <button
          onClick={() => setShowAll(true)}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg font-medium"
        >
          Liste totale
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
            {filteredData.map((row) => (
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
      {openCamera && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 relative w-[400px]">
            <button
              onClick={() => setOpenCamera(false)}
              className="absolute top-2 right-2 text-white"
            >
              ✕
            </button>

            <video
              autoPlay
              playsInline
              className="w-full rounded-lg"
              ref={(video) => {
                if (video) {
                  navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                      video.srcObject = stream;
                    });
                }
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
