import { Button, TextField, MenuItem, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import GridOnIcon from "@mui/icons-material/GridOn";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListPresence } from "../services/Eleve";

const statusColors: Record<string, string> = {
  Présent: "bg-green-600 text-white",
  Absent: "bg-red-500 text-white",
  Retard: "bg-yellow-500 text-white",
  "Sortie urgence": "bg-orange-500 text-white",
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

export default function PresenceList() {
  const [data, setData] = useState<Presence[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);

  const [openPresenceModal, setOpenPresenceModal] = useState(false);

  const [presenceForm, setPresenceForm] = useState({
    cours: "",
    heureDebut: new Date().toISOString().slice(0, 16),
    heureLimite: "",
    heureFin: "",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await getListPresence();

        if (!Array.isArray(apiData)) {
          setData([]);
          return;
        }

        setData(
          apiData.map((p: any) => ({
            id: p.id,
            name: p.nom_complet ?? p.name,
            avatar: p.avatar ?? "https://i.pravatar.cc/150",
            cours: p.cours,
            date: p.date,
            entree: p.entree ?? "-",
            sortie: p.sortie ?? "-",
            statut: p.statut,
          }))
        );
      } catch (error) {
        toast.error("Erreur lors du chargement de la liste de présence");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  //Filtrage
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  const allowedStatus = ["Absent", "Retard", "Sortie urgence"];

  const filteredData = data.filter((row) => {
    const matchStatus = showAll || allowedStatus.includes(row.statut);
    const matchName = row.name.toLowerCase().includes(search.toLowerCase());
    const matchCourse =
      courseFilter === "all" || row.cours === courseFilter;
    const matchDate =
      dateFilter === "all" ||
      (dateFilter === "today" && row.date === today) ||
      (dateFilter === "yesterday" && row.date === yesterday);

    return matchStatus && matchName && matchCourse && matchDate;
  });

  const handleExcel = () => {
    toast.success("Exportation pas disponible pour votre mode !");
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

      <h1 className="text-4xl font-extrabold mb-8">
        Liste des Absences et retards
      </h1>

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

        {/* <Button
          variant="contained"
          startIcon={<GridOnIcon />}
          className="normal-case bg-green-600 hover:bg-green-700"
          onClick={handleExcel}
        >
          Exporter en Excel
        </Button> */}

        <button
          onClick={() => setOpenPresenceModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium" >
            <span className="text-xl">＋</span> 
          Nouvel Présence
        </button>


        <button
          onClick={() => {
            setShowAll(false);
            setOpenCamera(true);
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


      {openPresenceModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[450px] p-6 relative shadow-xl">
            <h2 className="text-xl font-bold mb-4">Nouvelle séance de présence</h2>

            <div className="flex flex-col gap-4">
              <TextField
                label="Cours / Activité"
                fullWidth
                value={presenceForm.cours}
                onChange={(e) =>
                  setPresenceForm({ ...presenceForm, cours: e.target.value })
                }
              />

              <TextField
                label="Heure de début"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={presenceForm.heureDebut}
                disabled
              />

              <TextField
                label="Heure limite de retard"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={presenceForm.heureLimite}
                onChange={(e) =>
                  setPresenceForm({ ...presenceForm, heureLimite: e.target.value })
                }
              />

              <TextField
                label="Heure de fin"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={presenceForm.heureFin}
                onChange={(e) =>
                  setPresenceForm({ ...presenceForm, heureFin: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outlined"
                onClick={() => setOpenPresenceModal(false)}
              >
                Annuler
              </Button>

              <Button
                variant="contained"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  toast.success("Séance de présence créée");
                  setOpenPresenceModal(false);
                }}
              >
                Valider
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
