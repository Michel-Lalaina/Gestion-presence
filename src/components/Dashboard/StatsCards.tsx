import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

// const ApiUrl = (endpoint: string) => `${API_BASE_URL}/${endpoint}`;

// export default function StatsCards() {
//   const [apiStats, setApiStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   const fetchStats = async () => {
//     try {
//       setLoading(true);

//       const { data } = await axios.get(ApiUrl("presences/dashboard"));

//       if (data.success) {
//         setApiStats(data.stats);
//       }
//     } catch (error) {
//       console.error("Erreur chargement stats :", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   if (loading || !apiStats) {
//     return (
//       <div className="text-center py-10 text-gray-500 animate-pulse">
//         Chargement des statistiques...
//       </div>
//     );
//   }

//   const today = new Date().toISOString().split("T")[0];

//   const coursToday =
//     apiStats.cours_par_jour.find(
//       (item: any) => item.date === today
//     )?.total_cours || 0;

//   const stats = [
//     {
//       title: "Taux de Présence",
//       value: `${apiStats.presence.taux_presence}%`,
//       icon: (
//         <EventAvailableIcon className="text-green-500 drop-shadow-sm" />
//       ),
//       bg: "from-green-50 to-green-100",
//       border: "border-green-200",
//     },

//     {
//       title: "Étudiants Inscrits",
//       value: apiStats.total_etudiants,
//       icon: (
//         <PeopleIcon className="text-blue-500 drop-shadow-sm" />
//       ),
//       bg: "from-blue-50 to-blue-100",
//       border: "border-blue-200",
//     },

//     {
//       title: "Cours Aujourd'hui",
//       value: coursToday,
//       icon: (
//         <CalendarTodayIcon className="text-purple-500 drop-shadow-sm" />
//       ),
//       bg: "from-purple-50 to-purple-100",
//       border: "border-purple-200",
//     },

//     {
//       title: "Taux d'Absence",
//       value: apiStats.presence.taux_absence + "%",
//       icon: (
//         <HighlightOffIcon className="text-red-500 drop-shadow-sm" />
//       ),
//       bg: "from-red-50 to-red-100",
//       border: "border-red-200",
//     },
//   ];

//   return (
//     <div
//       className="
//         grid grid-cols-4 gap-6
//         max-xl:grid-cols-2
//         max-md:grid-cols-1
//       "
//     >
//       {stats.map((s, i) => (
//         <div
//           key={i}
//           className={`
//             flex flex-col justify-between
//             bg-white
//             rounded-2xl
//             p-6
//             border
//             ${s.border}
//             shadow-sm
//             hover:shadow-xl
//             hover:-translate-y-1
//             transition-all
//             duration-300
//             bg-gradient-to-br
//             ${s.bg}
//           `}
//         >
//           {/* Header */}
//           <div className="flex items-center gap-4">
//             <div
//               className="
//                 p-3 rounded-xl bg-white shadow
//                 flex items-center justify-center
//                 text-3xl
//               "
//             >
//               {s.icon}
//             </div>

//             <p className="font-semibold text-gray-700 text-lg">
//               {s.title}
//             </p>
//           </div>

//           {/* Value */}
//           <p className="text-4xl font-extrabold mt-5 text-gray-900 tracking-tight">
//             {s.value}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// }

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
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Chargement des statistiques...
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  const coursToday =
    apiStats.cours_par_jour.find(
      (item: any) => item.date === today
    )?.total_cours || 0;

  const stats = [
    {
      title: "Taux de Présence",
      value: `${apiStats.presence.taux_presence}%`,
      icon: <EventAvailableIcon className="text-green-500" />,
      glow: "shadow-green-300",
      bg: "from-green-50/60 to-white backdrop-blur-xl",
      border: "border-green-200/60",
    },

    {
      title: "Étudiants Inscrits",
      value: apiStats.total_etudiants,
      icon: <PeopleIcon className="text-blue-500" />,
      glow: "shadow-blue-300",
      bg: "from-blue-50/60 to-white backdrop-blur-xl",
      border: "border-blue-200/60",
    },

    {
      title: "Cours Aujourd'hui",
      value: coursToday,
      icon: <CalendarTodayIcon className="text-purple-500" />,
      glow: "shadow-purple-300",
      bg: "from-purple-50/60 to-white backdrop-blur-xl",
      border: "border-purple-200/60",
    },

    {
      title: "Taux d'Absence",
      value: apiStats.presence.taux_absence + "%",
      icon: <HighlightOffIcon className="text-red-500" />,
      glow: "shadow-red-300",
      bg: "from-red-50/60 to-white backdrop-blur-xl",
      border: "border-red-200/60",
    },
  ];

  return (
    <div
      className="grid grid-cols-4 gap-6
      max-xl:grid-cols-2
      max-md:grid-cols-1
      animate-fadeIn"
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className={`
            group
            flex flex-col justify-between relative overflow-hidden
            rounded-2xl p-6 border ${s.border}
            shadow-sm bg-gradient-to-br ${s.bg}
            transition-all duration-500
            hover:shadow-xl hover:-translate-y-1
            hover:bg-opacity-90
          `}
        >
          {/* Glow animated background circle */}
          <div
            className={`
              absolute w-32 h-32 rounded-full blur-3xl opacity-40 
              -top-10 -right-10 transition-all duration-500 
              group-hover:opacity-70 ${s.glow}
            `}
          ></div>

          {/* Header */}
          <div className="flex items-center gap-4 relative z-10">
            <div
              className={`
                p-3 rounded-xl bg-white/80 shadow ${s.glow}
                flex items-center justify-center
                text-3xl transition-all duration-300
                group-hover:scale-110
              `}
            >
              {s.icon}
            </div>

            <p className="font-semibold text-gray-700 text-lg tracking-wide">
              {s.title}
            </p>
          </div>

          {/* Value */}
          <div className="relative z-10">
            <p className="text-4xl font-extrabold mt-6 text-gray-900 tracking-tight drop-shadow-sm">
              {s.value}
            </p>

            {/* underline indicator */}
            <div
              className="
                w-10 h-1 bg-gray-900/60 rounded-full mt-2
                transition-all duration-500 group-hover:w-20
              "
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}