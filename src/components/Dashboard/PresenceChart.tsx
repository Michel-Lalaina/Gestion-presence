
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const data = [
  { name: "Algo.", value: 85 },
  { name: "Web", value: 95 },
  { name: "BDD", value: 70 },
  { name: "Réseaux", value: 90 },
  { name: "Systèmes", value: 88 },
  { name: "Mobile", value: 60 },
  { name: "IA", value: 92 },
];

export default function PresenceChart() {
  return (
    <div className="w-full bg-white shadow-sm border border-gray-100 rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4">
        Taux de Présence par Cours
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#A7E5C1" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
