import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";

const ApiUrl = (endpoint: string) =>
  `${API_BASE_URL}/${endpoint}`;

export default function PresenceChart() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPresenceByCourse = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        ApiUrl("presences/presence-par-cours")
      );

      if (response.data.success) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Erreur chargement graphique présence :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresenceByCourse();
  }, []);

  return (
    <div className="w-full bg-white/90 backdrop-blur-xl border border-gray-200 shadow-lg rounded-2xl p-5 transition-all">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Taux de Présence par Cours
          </h2>
          <p className="text-xs text-gray-500">
            Analyse des performances de présence
          </p>
        </div>

        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
      </div>

      {/* CONTENT */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-500">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin mb-2"></div>
          Chargement des données...
        </div>
      ) : data.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-gray-400">
          <div className="text-4xl mb-2">📊</div>
          Aucune donnée disponible
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barCategoryGap={30}>

              {/* GRID SOFT */}
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

              {/* AXES CLEAN */}
              <XAxis
                dataKey="name"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                }}
              />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
                fill="url(#greenGradient)"
                animationDuration={900}
              />

              {/* GRADIENT BAR */}
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#34D399" />
                  <stop offset="100%" stopColor="#A7F3D0" />
                </linearGradient>
              </defs>

            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}