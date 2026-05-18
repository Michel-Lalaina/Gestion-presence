import { Button, TextField, MenuItem, Avatar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import GridOnIcon from "@mui/icons-material/GridOn";
import { useEffect, useState } from "react";
import QRCodeScanner from "../components/QRCodeScan";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListPresence, createPresenceSession, getStudentListBySeance } from "../services/Eleve";

import { useDispatch, useSelector } from "react-redux";
import {
  setSeance,
  clearSeance,
  closeSeance,
} from "../store/seanceSlice";
import { RootState } from "../store/store";

const statusColors: Record<string, string> = {
  Présent: "bg-green-600 text-white",
  Absent: "bg-red-500 text-white",
  Retard: "bg-yellow-500 text-white",
  "Sortie urgence": "bg-orange-500 text-white",
  "En cours": "bg-blue-500 text-white"
};
interface Student {
      id: number,
      matricule: string,
      mention: string,
      niveau: string,
      nom: string,
      parcours: string,
      prenom: string,
      statut:string
}
// interface Presence {
//   id: number;
//   name: string;
//   avatar: string;
//   cours: string;
//   date: string;
//   entree: string;
//   sortie: string;
//   statut: string;
// }

interface UpPresence {
  nom : string,
  heure_scan:string,
  id:number,
  prenom:string,
  statut: string,
  matricule:string
}

export default function PresenceList() {
  const [data, setData] = useState<{ data: UpPresence[],date:string,seance:string }>({ data: [],date: "",seance:""});
  const [EmptyDataSeance, setEmptyDataSeance] = useState<{ data: Student[]}>({ data: []});
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  // const [seance_id, setSeanceId] = useState<string | null>(6);
  const dispatch = useDispatch();

  const seance = useSelector(
    (state: RootState) => state.seance_store
  );
  const handleCreateSession = async () => {
  const response = await createPresenceSession({
    cours: presenceForm.cours,
    mention: presenceForm.mention,
    parcours: presenceForm.parcours,
    niveau: presenceForm.niveau,
    heure_debut: presenceForm.heureDebut,
    heure_limite_retard: presenceForm.heureLimite,
    heure_fin: presenceForm.heureFin,
  });
  await dispatch(
    setSeance({
      id: response.seance.id,
      cours: response.seance.matiere,
      mention: response.seance.mention,
      parcours: response.seance.parcours,
      niveau: response.seance.niveau,
      heure_debut: response.seance.heure_debut,
      heure_limite_retard: response.seance.heure_limite_retard,
      heure_fin: response.seance.heure_fin,
      active: true,
    })
  );
    // liste vide vierge
  const StudentData = await getStudentListBySeance(response.seance.id.toString())
  let newStudentData = StudentData.map((std:any)=>{return {...std, statut: "En cours"}})
  
  setEmptyDataSeance({data:newStudentData})


};
  const [openPresenceModal, setOpenPresenceModal] = useState(false);

  const [presenceForm, setPresenceForm] = useState({
    cours: "",
    heureDebut: new Date().toTimeString().slice(0,5),
    heureLimite: "",
    heureFin: "",
    mention:"",
    parcours:"",
    niveau:""
  });

  // check pour le active status 
  useEffect(() => {
  if (!seance.active || !seance.heure_fin) return;

  const checkSeanceStatus = () => {
    const now = new Date();

    // heure_fin = "22:21"
    const [hours, minutes] = seance.heure_fin
      .split(":")
      .map(Number) as [number, number];

    const endTime = new Date();
    endTime.setHours(hours, minutes, 0, 0);

    // si l'heure actuelle dépasse l'heure de fin
    if (now >= endTime) {
      dispatch(closeSeance());
      fetchData(); // rafraîchir la liste pour afficher les statuts finaux
      console.log("Séance clôturée automatiquement");
    }
  };

  // vérification immédiate au chargement
  checkSeanceStatus();

  // vérification chaque 30 secondes
  const interval = setInterval(() => {
    checkSeanceStatus();
  }, 30000);

  return () => clearInterval(interval);
}, [seance.active, seance.heure_fin, dispatch]);

const fetchData = async () => {
  if(seance.id!==null){
  try {
    const apiData = await getListPresence(seance.id.toString());
    let Data = [...apiData.absent,...apiData.present,...apiData.retard]
    setData({
      data: Data.map((p: any) => ({
        id: p.id,
        nom:p.nom,
        heure_scan:p.heure_scan,
        prenom:p.prenom,
        statut: p.statut,
        matricule:p.matricule,
      }))
      ,date: apiData.date || "",seance: apiData.seance || ""
    }
    );

    // actualisation liste vierge 
  const StudentData = await getStudentListBySeance(seance.id.toString())
  let newStudentData = StudentData.map((std:any)=>{return {...std, statut: "En cours"}})
  
  setEmptyDataSeance({data:newStudentData})


    // setData(
    //   apiData.map((p: any) => ({
    //     id: p.id,
    //     name: p.nom_complet ?? p.name,
    //     avatar: p.avatar ?? "https://i.pravatar.cc/150",
    //     cours: p.cours,
    //     date: p.date,
    //     entree: p.entree ?? "-",
    //     sortie: p.sortie ?? "-",
    //     statut: p.statut,
    //   }))
    // );
  } catch (error) {
    toast.error("Erreur lors du chargement de la liste de présence");
    console.error(error);
  }
  }
};

  useEffect(() => {
    fetchData();
  }, []);


  //Filtrage
  const today = new Date().toISOString().split("T")[0];
  const yesterday = new Date(Date.now() - 86400000)
    .toISOString()
    .split("T")[0];

  const allowedStatus = ["Absent", "Retard", "Sortie urgence","Présent"];

  const filteredData = data.data.filter((row) => {
    const matchStatus = showAll || allowedStatus.includes(row.statut);
    const matchName = row.nom.toLowerCase().includes(search.toLowerCase());
    // const matchCourse =
    //   courseFilter === "all" || row.cours === courseFilter;
    const matchDate =
      dateFilter === "all" ||
      (dateFilter === "today" && data.date === today) ||
      (dateFilter === "yesterday" && data.date === yesterday);

    return matchStatus && matchName && matchDate;
  });

  const handleExcel = () => {
    toast.success("Exportation pas disponible pour votre mode !");
  };


  return (
    <div className="flex flex-col w-full py-8">
      <ToastContainer position="top-right" autoClose={5000} />

      <h1 className="text-4xl font-extrabold mb-8">
        Liste des Absences et retards
      </h1>
      {/* FILTER BAR */}
      <div className="w-full bg-white rounded-xl shadow p-5 flex gap-3 items-center mb-4">
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
          className="normal-case"
          onClick={handleExcel}
        >
          Exporter
        </Button>

        <button
          onClick={() => setOpenPresenceModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium" >
          <span className="text-xl">＋</span>
          Nouvel
        </button>


        <button
          onClick={() => setOpenCamera(true)}
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium"
        >
          <span className="text-xl">＋</span> Scanner
        </button>


        <button
          onClick={() => setShowAll(true)}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 rounded-lg font-medium"
        >
          Liste totale
        </button>
      </div>
      {/* TABLE */}
      {seance.id !== null ? (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="text-center">
            <h5 className="py-4 px-6 font-bold"> présences pour le cours {seance.cours.toUpperCase()} {seance.niveau +" " + seance.parcours.toUpperCase()} </h5>
          </div>
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-600 text-left text-sm">
{!seance.active ?              <tr>
                <th className="py-4 px-6 text-center">Étudiant</th>
                <th className="py-4 px-6  text-center">Date</th>
              <th className="py-4 px-6  text-center">Cours</th>
              <th className="py-4 px-6  text-center">Heure d’entrée</th>
              <th className="py-4 px-6  text-center">Heure de sortie</th>
              <th className="py-4 px-6  text-center">Statut</th>
            </tr>
:
              <tr>
                <th className="py-4 px-6  text-center">Niveau</th>
                <th className="py-4 px-6  text-center">Nom</th>
                <th className="py-4 px-6  text-center">Matricule</th>
              <th className="py-4 px-6  text-center">Statut</th>
            </tr>
}          </thead>

          <tbody>
    {
    // SEANCE ACTIVE
    (seance.active && EmptyDataSeance.data.length > 0) ? EmptyDataSeance.data.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              <td className="py-4 px-6">
                {row.niveau} {row.parcours}
              </td>
              <td className="py-4 px-6 flex items-center gap-3 text-center">
                {/* <Avatar src={row.avatar} /> */}
                <span className="font-medium">{row.nom} {row.prenom} </span>
              </td>
              <td className="py-4 px-6">{row.matricule}</td>
              <td className="py-4 px-6">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-medium ${statusColors[row.statut]}`}
                >
                  {row.statut}
                </span>
              </td>
            </tr>))
            :
            filteredData.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                <td className="py-4 px-6 flex items-center gap-3">
                  {/* <Avatar src={row.avatar} /> */}
                  <span className="font-medium">{row.nom} {row.prenom} </span>
                </td>
                <td className="py-4 px-6">{data.date}</td>
                <td className="py-4 px-6">{data.seance}</td>
                <td className="py-4 px-6">{ row.statut!=="Absent" ? seance.heure_debut : "-" }</td>
                <td className="py-4 px-6">{ row.statut!=="Absent" ? seance.heure_fin : "-" }</td>
                <td className="py-4 px-6">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${statusColors[row.statut]}`}
                  >
                    {row.statut}
                  </span>
                </td>
              </tr>
            ))
  }

          </tbody>
        </table>
      </div>) : (
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Aucune séance active</h2>
          <p className="text-gray-600 mb-6">
            Veuillez sélectionner ou démmarer une séance pour voir les présences.
          </p>
        </div>    
      )}

      {openCamera && (
        <QRCodeScanner
          onClose={() => setOpenCamera(false)}
        />
      )}


      {openPresenceModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[450px] p-6 relative shadow-xl">
            <h2 className="text-xl font-bold mb-4">Nouvelle séance de présence</h2>
            <div className="flex flex-col gap-4">
              <TextField
                label="Mention"
                select
                fullWidth
                value={presenceForm.mention}
                onChange={(e) =>
                {
                  console.log("e",e);
                  setPresenceForm({ ...presenceForm, mention: e.target.value })
                }
                }
              >
                <MenuItem value="Informatique" > Informatique </MenuItem>
                <MenuItem value="Intelligence Artificielle" > Intelligence artificielle </MenuItem>
              </TextField>

              <TextField
                label="Parcours"
                select
                fullWidth
                value={presenceForm.parcours}
                onChange={(e) =>
                  setPresenceForm({ ...presenceForm, parcours: e.target.value })
                }
              >
                {presenceForm.mention=="Informatique" && <MenuItem value="GB"> Génie Logiciel et Base de donnée </MenuItem>}
                {presenceForm.mention=="Informatique" &&<MenuItem value="SR"> Systeme et Réseau </MenuItem>}
                {presenceForm.mention=="Informatique" &&<MenuItem value="IG"> Informatique Génerale </MenuItem>}
                {presenceForm.mention=="Intelligence Artificielle" && <MenuItem value="GID"> Gouvernance et Ingénieurie de Donnée </MenuItem>}
                {presenceForm.mention=="Intelligence Artificielle" &&<MenuItem value="OCC"> Objet Connecté et Cybersécurité </MenuItem>}
              </TextField>

              <TextField
                label="Cours / Activité"
                fullWidth
                value={presenceForm.cours}
                onChange={(e) =>
                  setPresenceForm({ ...presenceForm, cours: e.target.value })
                }
              />
              <TextField
                label="Niveau"
                select
                fullWidth
                value={presenceForm.niveau}
                onChange={(e) =>
                  setPresenceForm({ ...presenceForm, niveau: e.target.value })
                }
              >
                <MenuItem value="L1">L1</MenuItem>
                <MenuItem value="L2">L2</MenuItem>
                <MenuItem value="L3">L3</MenuItem>
                <MenuItem value="M1">M1</MenuItem>
                <MenuItem value="M2">M2</MenuItem>
              </TextField>

              <TextField
                label="Heure de début"
                type="time"
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
                onClick={async () => {
                  if (
                    !presenceForm.cours.trim() ||
                    !presenceForm.heureLimite ||
                    !presenceForm.heureFin
                  ) {
                    toast.error("Veuillez remplir tous les champs");
                    return;
                  }

                  try {
                    await handleCreateSession();
                    // const dataSeance = await createPresenceSession({
                    //   mention:presenceForm.mention,
                    //   parcours:presenceForm.parcours,
                    //   cours: presenceForm.cours,
                    //   heure_debut: presenceForm.heureDebut,
                    //   heure_limite_retard: presenceForm.heureLimite,
                    //   heure_fin: presenceForm.heureFin,
                    //   niveau:presenceForm.niveau
                    // });

                    // let seance = dataSeance.seance;
                    // setSeanceId(seance.id);
                    toast.success("Séance de présence créée avec succès");

                    setOpenPresenceModal(false);

                    // reset propre
                    setPresenceForm({
                      cours: "",
                      heureDebut: new Date().toTimeString().slice(0, 5),
                      heureLimite: "",
                      heureFin: "",
                      mention:"",
                      parcours:"",
                      niveau:""
                    });
                  } catch (error) {
                    console.error(error);
                    toast.error("Erreur lors de la création de la séance");
                  }
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
