
import StatsCards from "../components/dashboard/StatsCards";
import PresenceChart from "../components/dashboard/PresenceChart";
import RecentActivity from "../components/dashboard/RecentActivity";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* TITRE + SEARCH BAR */}
      <div className="flex items-center justify-between">
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
      <div className="grid grid-cols-3 gap-6">
        
        <div className="col-span-2">
          <PresenceChart />
        </div>

        <RecentActivity />

      </div>
    </div>
  );
}
