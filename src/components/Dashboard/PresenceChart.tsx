import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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
      console.error(
        "Erreur chargement graphique présence :",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresenceByCourse();
  }, []);

  return (
    <div className="w-full bg-white shadow-sm border border-gray-100 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Taux de Présence par Cours
      </h2>

      {loading ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          Chargement...
        </div>
      ) : data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500">
          Aucune donnée disponible
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#A7E5C1"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}