import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { NavLink } from "react-router-dom";

import { AdminPanelSettings } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";


export const Side: React.FC = () => {
      const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

return (
  <aside className="h-screen w-64 bg-gradient-to-b from-white to-gray-50/80 backdrop-blur-xl border-r border-gray-100 shadow-xl flex flex-col px-5 py-6 fixed">

    {/* LOGO */}
    <div className="flex items-center gap-3 mb-10 px-2">
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
        QR
      </div>
      <div className="font-bold text-xl tracking-tight text-gray-800">
        QRPrésence
      </div>
    </div>

    {/* NAVIGATION */}
    <nav className="flex flex-col gap-2 text-gray-600">

      {[
        { to: "/dashboard", icon: <DashboardIcon />, label: "Dashboard" },
        { to: "/etudiants", icon: <PersonIcon />, label: "Cartes d'étudiant" },
        { to: "/presences", icon: <QrCodeIcon />, label: "Présence" },
        { to: "/utilisateurs", icon: <AdminPanelSettings />, label: "Utilisateurs" },
        { to: "/parametres", icon: <SettingsIcon />, label: "Paramètres" },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
            ${
              isActive
                ? "bg-green-50 text-green-700 font-semibold shadow-sm"
                : "hover:bg-gray-100 hover:text-gray-900"
            }`
          }
        >
          {/* active indicator */}
          <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-green-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-200" />

          <span
            className={`transition-transform duration-200 group-hover:scale-110 ${
              "text-lg"
            }`}
          >
            {item.icon}
          </span>

          <span className="text-sm tracking-wide">{item.label}</span>
        </NavLink>
      ))}
    </nav>

    {/* LOGOUT */}
    <div className="mt-auto px-2">
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
        bg-red-50 text-red-600 font-medium
        hover:bg-red-100 hover:shadow-md
        transition-all duration-200"
      >
        Déconnexion
      </button>
    </div>
  </aside>
    );
};
