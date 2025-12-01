
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function StatsCards() {
  const stats = [
    {
      title: "Taux de Présence",
      value: "92%",
      icon: <EventAvailableIcon className="text-green-600" />,
    },
    {
      title: "Étudiants Inscrits",
      value: "150",
      icon: <PeopleIcon className="text-green-600" />,
    },
    {
      title: "Cours Aujourd'hui",
      value: "4",
      icon: <CalendarTodayIcon className="text-green-600" />,
    },
    {
      title: "Absences Totales",
      value: "38",
      icon: <HighlightOffIcon className="text-red-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-white shadow-sm rounded-xl px-6 py-6 border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="text-3xl">{s.icon}</div>
            <p className="font-medium">{s.title}</p>
          </div>
          <p className="text-3xl font-bold mt-3">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
