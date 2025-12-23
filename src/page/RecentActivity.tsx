
// import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import CancelIcon from "@mui/icons-material/Cancel";
// import DescriptionIcon from "@mui/icons-material/Description";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const activities = [
//   {
//     name: "Jean Dupont",
//     action: "marqué présent",
//     course: "Algorithmique",
//     icon: <CheckCircleIcon className="text-green-600" />,
//     time: "il y a 5 min",
//   },
//   {
//     name: "Marie Curie",
//     action: "marquée absente",
//     course: "Base de Données",
//     icon: <CancelIcon className="text-red-500" />,
//     time: "il y a 12 min",
//   },
//   {
//     name: "Albert Einstein",
//     action: "marqué présent",
//     course: "Algorithmique",
//     icon: <CheckCircleIcon className="text-green-600" />,
//     time: "il y a 15 min",
//   },
//   {
//     name: "Isaac Newton",
//     action: "marqué présent",
//     course: "Algorithmique",
//     icon: <CheckCircleIcon className="text-green-600" />,
//     time: "il y a 20 min",
//   },
// ];

//     const handleDownload = () => {
//         toast.error("Exportation pas disponible pour votre mode veuillez visiter la présences!");

//     };

// export default function RecentActivity() {
//   return (
//     <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
//         <ToastContainer position="top-right" autoClose={5000} />
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Activité Récente</h2>

//         <button  onClick={handleDownload} className=" bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
             
//           <DescriptionIcon fontSize="small" />
          
//           Générer Rapport
//         </button>
//       </div>

//       <div className="flex flex-col gap-4">
//         {activities.map((a, i) => (
//           <div key={i} className="flex items-start gap-3">
//             <div className="mt-1">{a.icon}</div>
//             <div>
//               <p className="font-medium">
//                 {a.name} <span className="text-gray-600">{a.action}</span>
//               </p>
//               <p className="text-sm text-gray-500">
//                 au cours '{a.course}'. <br />
//                 <span className="text-gray-400">{a.time}</span>
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionIcon from "@mui/icons-material/Description";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const activities = [
  {
    name: "Marie Curie",
    action: "marquée absente",
    course: "Base de Données",
    icon: <CancelIcon className="text-red-500" />,
    time: "il y a 12 min",
  },
];

const handleDownload = () => {
  toast.error("Exportation pas disponible pour votre mode veuillez visiter la présences!");
};

// 🔥 Nouveau graphique circulaire
const chartData = {
  labels: ["Présent", "Absent", "Retard"],
  datasets: [
    {
      data: [65, 25, 10],
      backgroundColor: [
        "#7c3aed", // violet
        "#ef4444", // rouge
        "#22c55e", // vert
      ],
      borderColor: "#ffffff", // blanc
      borderWidth: 4,
      hoverOffset: 8,
    },
  ],
};

const chartOptions = {
  cutout: "70%",
  plugins: {
    legend: {
      display: true,
      position: "bottom" as const,
      labels: {
        color: "#333",
        font: { size: 12 }
      }
    }
  }
};


export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">

      <ToastContainer position="top-right" autoClose={5000} />

      {/* TOP BAR */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activité Récente</h2>

        <button
          onClick={handleDownload}
          className=" bg-purple-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <DescriptionIcon fontSize="small" />
          Générer Rapport
        </button>
      </div>

      {/* ACTIVITÉS + CHART */}
      <div className="flex gap-6">

        {/* LISTE D'ACTIVITÉ */}
        <div className="flex flex-col gap-4 w-1/2">
          {activities.map((a, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-1">{a.icon}</div>
              <div>
                <p className="font-medium">
                  {a.name} <span className="text-gray-600">{a.action}</span>
                </p>
                <p className="text-sm text-gray-500">
                  au cours '{a.course}'. <br />
                  <span className="text-gray-400">{a.time}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* GRAPHIQUE CIRCULAIRE */}
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-48 h-48">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>

      </div>
    </div>
  );
}
