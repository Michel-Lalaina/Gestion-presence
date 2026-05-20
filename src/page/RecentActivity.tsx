import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DescriptionIcon from "@mui/icons-material/Description";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const ApiUrl = (endpoint: string) =>
  `${API_BASE_URL}/${endpoint}`;

export default function RecentActivity() {
  const [activities, setActivities] = useState<any[]>([]);
  const [chartStats, setChartStats] = useState({
    present: 0,
    absent: 0,
    retard: 0
  });

  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get(
        ApiUrl("presences/recent-activity")
      );

      if (response.data.success) {
        setActivities(response.data.activities);
        setChartStats(response.data.chart);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur chargement activité récente");
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  const handleDownload = () => {
    toast.error(
      "Exportation non disponible ici, veuillez visiter la page présences"
    );
  };

  const getIcon = (statut: string) => {
    if (statut === "Présent") {
      return <CheckCircleIcon className="text-green-500" />;
    }

    if (statut === "Retard") {
      return <AccessTimeIcon className="text-yellow-500" />;
    }

    return <CancelIcon className="text-red-500" />;
  };

  const chartData = {
    labels: ["Présent", "Absent", "Retard"],
    datasets: [
      {
        data: [
          chartStats.present,
          chartStats.absent,
          chartStats.retard
        ],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#7c3aed"
        ],
        borderColor: "#ffffff",
        borderWidth: 4,
        hoverOffset: 8
      }
    ]
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#333",
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (


    <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
  <ToastContainer position="top-right" autoClose={5000} />

  {/* HEADER */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
      Activité Récente
    </h2>

    <button
      onClick={handleDownload}
      className="bg-gradient-to-r from-purple-500 to-purple-600 text-white 
                 px-4 py-2 rounded-xl flex items-center gap-2 shadow 
                 hover:from-purple-600 hover:to-purple-700 transition-all"
    >
      <DescriptionIcon fontSize="small" />
      Générer Rapport
    </button>
  </div>

  <div className="flex gap-8">
    {/* LISTE ACTIVITÉS */}
    <div className="flex flex-col gap-4 w-1/2">

      {activities
        .filter((a) => a.statut === "retard" || a.statut === "absent")
        .map((a, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 
                       bg-gray-50 hover:bg-gray-100 transition-all shadow-sm"
          >
            <div className="mt-1">{getIcon(a.statut)}</div>

            <div>
              <p className="font-semibold text-gray-800">
                {a.name}
                <span className="text-gray-600 font-normal"> {a.action}</span>
              </p>

              <p className="text-sm text-gray-500">
                au cours "<span className="font-medium text-gray-700">{a.course}</span>"
                <br />
                <span className="text-xs text-gray-400">{a.time}</span>
              </p>
            </div>
          </div>
        ))}
    </div>

    {/* CHART */}
    <div className="w-1/2 flex justify-center items-center">
      <div className="w-44 h-44 bg-white p-4 rounded-2xl shadow-inner">
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  </div>
</div>
    // <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
    //   <ToastContainer position="top-right" autoClose={5000} />

    //   <div className="flex justify-between items-center mb-4">
    //     <h2 className="text-xl font-semibold">
    //       Activité Récente
    //     </h2>

    //     <button
    //       onClick={handleDownload}
    //       className="bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
    //     >
    //       <DescriptionIcon fontSize="small" />
    //       Générer Rapport
    //     </button>
    //   </div>

    //   <div className="flex gap-6">
    //     {/* ACTIVITÉS */}
    //     <div className="flex flex-col gap-4 w-1/2">
    //       {activities.map((a, i) => (
    //         <div
    //           key={i}
    //           className="flex items-start gap-3"
    //         >
    //           <div className="mt-1">
    //             {getIcon(a.statut)}
    //           </div>

    //           <div>
    //             <p className="font-medium">
    //               {a.name}
    //               <span className="text-gray-600">
    //                 {" "}
    //                 {a.action}
    //               </span>
    //             </p>

    //             <p className="text-sm text-gray-500">
    //               au cours "{a.course}"
    //               <br />
    //               <span className="text-gray-400">
    //                 {a.time}
    //               </span>
    //             </p>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     {/* CHART */}
    //     <div className="w-1/2 flex justify-center items-center">
    //       <div className="w-48 h-48">
    //         <Doughnut
    //           data={chartData}
    //           options={chartOptions}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}