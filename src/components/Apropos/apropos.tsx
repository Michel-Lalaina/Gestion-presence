import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import codeImage from "../../assets/image/971.jpg";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const competences = [
  { name: "Full-Stack", value: 98 },
  { name: "IA integration", value: 75 },
];

const Apropos: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-50 to-white p-12 rounded-2xl shadow-xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
        {/* Image Section */}
        <div className="relative flex-shrink-0">
          <img
            src={codeImage}
            alt="Code screen"
            className="rounded-3xl shadow-lg w-80 h-80 object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-10 rounded-3xl"></div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-2/3 space-y-10">
          <h2 className="text-5xl font-extrabold text-gray-800 tracking-tight">À propos de moi</h2>

          {/* Formation */}
          <div className="flex items-start space-x-5">
            <div className="p-3 bg-blue-500 text-white rounded-full">
              <SchoolIcon fontSize="large" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Formation</h3>
              <p className="text-lg text-gray-600 font-medium">
                Master 1 en Informatique Générale à l'ENI
              </p>
            </div>
          </div>
         
          {/* Compétences avec Graphiques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h3 className="text-2xl font-semibold text-gray-700">Expertise</h3>
            {competences.map((comp, index) => (
              <div
                key={index}
                className="flex items-center bg-white p-5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 ease-in-out transition"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-700">{comp.name}</h3>
                  <p className="text-gray-500">Spécialisation en {comp.name}</p>
                </div>
                <div className="w-20 h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: comp.name, value: comp.value },
                          { name: "Autres", value: 100 - comp.value },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={15}
                        outerRadius={35}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        <Cell fill="#007BFF" />
                        <Cell fill="#E0E0E0" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ))}
          </div>

          {/* Technologies */}
          <div className="flex items-start space-x-5">
            <div className="p-3 bg-blue-500 text-white rounded-full">
              <BuildIcon fontSize="large" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-700">Technologies</h3>
              <p className="text-lg text-gray-600 font-medium">
                 FastAPI, ReactJS,ExpressJS, MySQL/MongoDB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apropos;
