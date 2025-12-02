
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DescriptionIcon from "@mui/icons-material/Description";

const activities = [
  {
    name: "Jean Dupont",
    action: "marqué présent",
    course: "Algorithmique",
    icon: <CheckCircleIcon className="text-green-600" />,
    time: "il y a 5 min",
  },
  {
    name: "Marie Curie",
    action: "marquée absente",
    course: "Base de Données",
    icon: <CancelIcon className="text-red-500" />,
    time: "il y a 12 min",
  },
  {
    name: "Albert Einstein",
    action: "marqué présent",
    course: "Algorithmique",
    icon: <CheckCircleIcon className="text-green-600" />,
    time: "il y a 15 min",
  },
  {
    name: "Isaac Newton",
    action: "marqué présent",
    course: "Algorithmique",
    icon: <CheckCircleIcon className="text-green-600" />,
    time: "il y a 20 min",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Activité Récente</h2>

        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
          <DescriptionIcon fontSize="small" />
          Générer Rapport
        </button>
      </div>

      <div className="flex flex-col gap-4">
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
    </div>
  );
}
