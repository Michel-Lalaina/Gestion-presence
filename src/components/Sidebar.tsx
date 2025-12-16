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
        <aside className="h-screen bg-white shadow-sm flex flex-col px-6 py-8 fixed ">

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-10"> 
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
                    QR
                </div>
                <div className="font-bold text-lg">QRPrésence</div>
            </div>

            {/* NAVIGATION */}
            <nav className="flex flex-col gap-4 text-gray-700">

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 cursor-pointer ${isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                        }`
                    }
                >
                    <DashboardIcon /> Dashboard
                </NavLink>

                <NavLink
                    to="/etudiants"
                    className={({ isActive }) =>
                        `flex items-center gap-3 cursor-pointer ${isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                        }`
                    }
                >
                    <PersonIcon /> Cartes d'étudiant
                </NavLink>

                <NavLink
                    to="/presences"
                    className={({ isActive }) =>
                        `flex items-center gap-3 cursor-pointer ${isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                        }`
                    }
                >
                    <QrCodeIcon /> Présence
                </NavLink>

                <NavLink
                    to="/utilisateurs"
                    className={({ isActive }) =>
                        `flex items-center gap-3 cursor-pointer ${isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                        }`
                    }
                >
                    <AdminPanelSettings /> Utilisateurs
                </NavLink>

                <NavLink
                    to="/parametres"
                    className={({ isActive }) =>
                        `flex items-center gap-3 cursor-pointer ${isActive ? "text-green-600 font-semibold" : "hover:text-green-600"
                        }`
                    }
                >
                    <SettingsIcon /> Paramètres
                </NavLink>
            </nav>

            {/* LOGOUT BUTTON */}
            <div className="mt-auto">
                      <button
        onClick={handleLogout} // <-- redirection vers Login
        className="normal-case bg-purple-500 text-white hover:bg-purple-700"
      >
        Se déconnecter
       </button>

            </div>
        </aside>
    );
};
