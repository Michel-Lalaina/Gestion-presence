import {
  Card,
  CardContent,
  TextField,
  MenuItem,
  Chip,
  Avatar,
  CircularProgress,
  InputAdornment,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../config";

interface Enregistrement {
  matricule: string;
  nom_complet: string;
  heure_entree: string | null;
  heure_fin: string | null;
  statut: string;
}

interface SeanceCours {
  seance_id: number;

  cours: string;
  date: string;

  heure_debut: string;
  heure_fin: string;

  mention: string;
  parcours: string;
  niveau: string;

  total_etudiants: number;

  enregistrements: Enregistrement[];
}

const statusColors: Record<
  string,
  "success" | "warning" | "error" | "default"
> = {
  Présent: "success",
  Retard: "warning",
  Absent: "error",
};

export default function PresenceCoursList() {
  const [loading, setLoading] = useState(true);

  const [seances, setSeances] = useState<SeanceCours[]>([]);

  const [filters, setFilters] = useState({
    cours: "",
    mention: "",
    niveau: "",
    search: "",

    dateDebut: "",
    dateFin: "",

    todayOnly: false,
  });

  // FETCH
  const fetchSeances = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API_BASE_URL}/seances/seances_cours`
      );

      if (response.data.success) {
        setSeances(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeances();
  }, []);

  // UNIQUE VALUES
  const uniqueCours = useMemo(() => {
    return [...new Set(seances.map((s) => s.cours))];
  }, [seances]);

  const uniqueMentions = useMemo(() => {
    return [...new Set(seances.map((s) => s.mention))];
  }, [seances]);

  const uniqueNiveaux = useMemo(() => {
    return [...new Set(seances.map((s) => s.niveau))];
  }, [seances]);

  // FILTERS
const filteredSeances = useMemo(() => {

  const parseFrenchDate = (dateStr: string) => {

    if (!dateStr) return null;

    // "19/05/2026"
    const [day, month, year] = dateStr.split("/");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );
  };

  return seances.filter((s) => {

    // -------------------------
    // COURS
    // -------------------------
    const matchCours =
      !filters.cours ||
      s.cours === filters.cours;

    // -------------------------
    // MENTION
    // -------------------------
    const matchMention =
      !filters.mention ||
      s.mention === filters.mention;

    // -------------------------
    // NIVEAU
    // -------------------------
    const matchNiveau =
      !filters.niveau ||
      s.niveau === filters.niveau;

    // -------------------------
    // SEARCH ETUDIANT
    // -------------------------
    const matchSearch =
      !filters.search ||
      s.enregistrements.some((e) =>
        e.nom_complet
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      );

    // -------------------------
    // DATE AUJOURD'HUI
    // -------------------------
    const today = new Date();

    const todayStr =
      today.toLocaleDateString("fr-FR");

    const matchToday =
      !filters.todayOnly ||
      s.date === todayStr;

    // -------------------------
    // DATE SEANCE
    // -------------------------
    const seanceDate =
      parseFrenchDate(s.date);

    if (!seanceDate) return false;

    // -------------------------
    // DATE DEBUT
    // -------------------------
    let matchDateDebut = true;

    if (filters.dateDebut) {

      const debut = new Date(filters.dateDebut);

      debut.setHours(0, 0, 0, 0);

      matchDateDebut =
        seanceDate >= debut;
    }

    // -------------------------
    // DATE FIN
    // -------------------------
    let matchDateFin = true;

    if (filters.dateFin) {

      const fin = new Date(filters.dateFin);

      fin.setHours(23, 59, 59, 999);

      matchDateFin =
        seanceDate <= fin;
    }

    return (
      matchCours &&
      matchMention &&
      matchNiveau &&
      matchSearch &&
      matchToday &&
      matchDateDebut &&
      matchDateFin
    );

  });

}, [seances, filters]);
  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* FILTER BAR */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

          {/* COURS */}
          <TextField
            select
            label="Cours"
            value={filters.cours}
            onChange={(e) =>
              setFilters({
                ...filters,
                cours: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="">
              Tous les cours
            </MenuItem>

            {uniqueCours.map((cours) => (
              <MenuItem key={cours} value={cours}>
                {cours}
              </MenuItem>
            ))}
          </TextField>

          {/* DATE DEBUT */}
          <TextField
            label="Date début"
            type="date"
            value={filters.dateDebut}
            onChange={(e) =>
              setFilters({
                ...filters,
                dateDebut: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          {/* DATE FIN */}
          <TextField
            label="Date fin"
            type="date"
            value={filters.dateFin}
            onChange={(e) =>
              setFilters({
                ...filters,
                dateFin: e.target.value,
              })
            }
            InputLabelProps={{ shrink: true }}
            fullWidth
          />

          {/* TODAY */}
          <TextField
            select
            label="Période rapide"
            value={filters.todayOnly ? "today" : ""}
            onChange={(e) =>
              setFilters({
                ...filters,
                todayOnly:
                  e.target.value === "today",
              })
            }
            fullWidth
          >
            <MenuItem value="">
              Toutes dates
            </MenuItem>

            <MenuItem value="today">
              Aujourd'hui
            </MenuItem>
          </TextField>

          {/* MENTION */}
          <TextField
            select
            label="Mention"
            value={filters.mention}
            onChange={(e) =>
              setFilters({
                ...filters,
                mention: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="">
              Toutes
            </MenuItem>

            {uniqueMentions.map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </TextField>

          {/* NIVEAU */}
          <TextField
            select
            label="Niveau"
            value={filters.niveau}
            onChange={(e) =>
              setFilters({
                ...filters,
                niveau: e.target.value,
              })
            }
            fullWidth
          >
            <MenuItem value="">
              Tous
            </MenuItem>

            {uniqueNiveaux.map((n) => (
              <MenuItem key={n} value={n}>
                {n}
              </MenuItem>
            ))}
          </TextField>

        </div>

        {/* SEARCH */}
        <div className="mt-4">
          <TextField
            label="Recherche étudiant"
            value={filters.search}
            onChange={(e) =>
              setFilters({
                ...filters,
                search: e.target.value,
              })
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>

      </div>

      {/* EMPTY */}
      {filteredSeances.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-100 text-gray-500">
          Aucun résultat trouvé
        </div>
      )}

      {/* LIST */}
      {filteredSeances.map((seance) => (
        <Card
          key={seance.seance_id}
          className="rounded-2xl shadow-sm border border-gray-100"
        >
          <CardContent>

            {/* HEADER */}
            <div className="flex justify-between items-start mb-5">

              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <SchoolIcon />
                  {seance.cours}
                </h2>

                <p className="text-gray-500 mt-1">
                  {seance.date}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {seance.mention} •{" "}
                  {seance.parcours} •{" "}
                  {seance.niveau}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {seance.total_etudiants} étudiants
                </p>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                <AccessTimeIcon
                  fontSize="small"
                  className="text-gray-600"
                />

                <span className="font-medium">
                  {seance.heure_debut} →{" "}
                  {seance.heure_fin}
                </span>
              </div>

            </div>

            {/* TABLE */}
            <div className="overflow-auto">
              <table className="w-full border-collapse">

                <thead>
                  <tr className="bg-gray-100 text-gray-700">

                    <th className="text-left px-4 py-3">
                      Étudiant
                    </th>

                    <th className="text-left px-4 py-3">
                      Matricule
                    </th>

                    <th className="text-left px-4 py-3">
                      Heure entrée
                    </th>

                    <th className="text-left px-4 py-3">
                      Heure fin
                    </th>

                    <th className="text-left px-4 py-3">
                      Statut
                    </th>

                  </tr>
                </thead>

                <tbody>
                  {seance.enregistrements.map((etu) => (
                    <tr
                      key={etu.matricule}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">

                          <Avatar
                            src={`https://i.pravatar.cc/150?u=${etu.matricule}`}
                          />

                          <span className="font-medium">
                            {etu.nom_complet}
                          </span>

                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {etu.matricule}
                      </td>

                      <td className="px-4 py-4">
                        {etu.heure_entree || "-"}
                      </td>

                      <td className="px-4 py-4">
                        {etu.heure_fin || "-"}
                      </td>

                      <td className="px-4 py-4">
                        <Chip
                          label={etu.statut}
                          color={
                            statusColors[etu.statut] ||
                            "default"
                          }
                        />
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </CardContent>
        </Card>
      ))}
    </div>
  );
}