import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const ApiUrl = (endpoint: string) => `${API_BASE_URL}/${endpoint}`;

export default function StatsCards() {
  const [apiStats, setApiStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(ApiUrl("presences/dashboard"));

      if (data.success) {
        setApiStats(data.stats);
      }
    } catch (error) {
      console.error("Erreur chargement stats :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !apiStats) {
    return (
      <div className="text-center py-10 text-gray-500">
        Chargement des statistiques...
      </div>
    );
  }

  // Trouver le nombre de cours aujourd’hui
  const today = new Date().toISOString().split("T")[0];

  const coursToday =
    apiStats.cours_par_jour.find(
      (item: any) => item.date === today
    )?.total_cours || 0;

  const stats = [
    {
      title: "Taux de Présence",
      value: `${apiStats.presence.taux_presence}%`,
      icon: (
        <EventAvailableIcon className="text-green-500 drop-shadow-sm" />
      ),
      bg: "from-green-100 to-green-50",
    },

    {
      title: "Étudiants Inscrits",
      value: apiStats.total_etudiants,
      icon: (
        <PeopleIcon className="text-blue-500 drop-shadow-sm" />
      ),
      bg: "from-blue-100 to-blue-50",
    },

    {
      title: "Cours Aujourd'hui",
      value: coursToday,
      icon: (
        <CalendarTodayIcon className="text-purple-500 drop-shadow-sm" />
      ),
      bg: "from-purple-100 to-purple-50",
    },

    {
      title: "Taux d'Absence",
      value: apiStats.presence.taux_absence+"%",
      icon: (
        <HighlightOffIcon className="text-red-500 drop-shadow-sm" />
      ),
      bg: "from-red-100 to-red-50",
    },
  ];

  return (
    <div
      className="
        grid grid-cols-4 gap-6
        max-xl:grid-cols-2
        max-md:grid-cols-1
        transition-all
      "
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className={`
            bg-white
            shadow-md
            rounded-2xl
            px-6
            py-6
            border
            border-gray-100
            hover:shadow-lg
            hover:-translate-y-1
            transition-all
            duration-300
            bg-gradient-to-b
            ${s.bg}
          `}
        >
          <div className="flex items-center gap-3">
            <div className="text-4xl p-2 bg-white rounded-lg shadow-sm">
              {s.icon}
            </div>

            <p className="font-semibold text-gray-700">
              {s.title}
            </p>
          </div>

          <p className="text-3xl font-black mt-4 text-gray-800">
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}