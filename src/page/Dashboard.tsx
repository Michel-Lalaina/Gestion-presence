import StatsCards from "../components/Dashboard/StatsCards";
import PresenceChart from "../components/Dashboard/PresenceChart";
import RecentActivity from "./RecentActivity";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 w-full min-h-screen">

      {/* TITRE + SEARCH BAR */}
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold">Tableau de Bord</h1>

        <input
          type="text"
          placeholder="Rechercher un étudiant, un cours..."
          className="
            w-96 px-5 py-2 rounded-full border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-green-500
          "
        />
      </div>

      {/* CARTES DE STATISTIQUES */}
      <StatsCards />

      {/* GRAPH + ACTIVITE RECENTE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        
        {/* GRAPH */}
        <div className="lg:col-span-2 w-full">
          <PresenceChart />
        </div>

        {/* ACTIVITÉ RÉCENTE */}
        <div className="w-full">
          <RecentActivity />
        </div>

      </div>
    </div>
  );
}
