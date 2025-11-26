
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Button } from "@mui/material";

export const Side:React.FC=()=>{
    return(
        <div className="full">
   {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-sm flex flex-col px-6 py-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
            QR
          </div>
          <div className="font-bold text-lg">QRPrésence</div>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700">
          <div className="flex items-center gap-3 hover:text-green-600 cursor-pointer">
            <DashboardIcon /> Dashboard
          </div>
          <div className="flex items-center gap-3 text-green-600 font-semibold cursor-pointer">
            <PersonIcon /> Cartes d'étudiant
          </div>
          <div className="flex items-center gap-3 hover:text-green-600 cursor-pointer">
            <QrCodeIcon /> Présence
          </div>
          <div className="flex items-center gap-3 hover:text-green-600 cursor-pointer">
            <SettingsIcon /> Paramètres
          </div>
        </nav>

        <div className="mt-auto">
          <Button
            fullWidth
            variant="contained"
            className="normal-case mt-10 bg-gray-300 text-gray-900 hover:bg-gray-400"
          >
            Se déconnecter
          </Button>
        </div>
      </aside>
      </div>
    )
}