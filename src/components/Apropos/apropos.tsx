
import BuildIcon from "@mui/icons-material/Build";
import SchoolIcon from "@mui/icons-material/School";
import codeImage from "../../assets/image/971.jpg";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const competences = [
  { name: "LLM", value: 90, color: "#0088FE" },
  { name: "Full-Stack", value: 95, color: "#800082" },
  { name: "Data Science", value: 75, color: "#00C49F" },
];

const Apropos: React.FC = () => {
  return (
    <div className="relative bg-gray-100 flex flex-col md:flex-row items-center md:items-start gap-12 p-10 rounded-2xl overflow-hidden">
      <div className="flex p-20 gap-12 bg-white rounded-lg items-center">
        {/* Image Section */}
        <img
          src={codeImage}
          alt="Code screen"
          className="relative z-10 rounded-xl shadow-md object-cover w-2/4 h-auto"
        />

        {/* Text Content */}
        <div className="relative z-10 w-full md:w-1/2 space-y-8">
          <h2 className="text-4xl font-bold text-gray-800">À propos de</h2>

          {/* Formation */}
          <div className="flex items-start space-x-4">
            <SchoolIcon className="text-blue-600" fontSize="large" />
            <div>
              <h3 className="text-xl font-bold text-gray-700">Formation</h3>
              <p className="text-gray-600 font-semibold">
                Master 2 en Informatique Générale à l'ENI
              </p>
            </div>
          </div>
          
          {/* Compétence avec Graphiques */}
          {competences.map((comp, index) => (
            <div key={index} className="flex items-start space-x-4">
              
              <div>
                <h3 className="text-xl font-bold text-gray-700">{comp.name}</h3>
                <p className="text-gray-600 font-semibold">Spécialisation en {comp.name}</p>
              </div>
              <div className="w-24 h-24">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[comp]} cx="40%" cy="40%" innerRadius={20} outerRadius={40} fill={comp.color} dataKey="value" >
                      <Cell key={`cell-${index}`} fill={comp.color} />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}

          {/* Technologies */}
          <div className="flex items-start space-x-4">
            <BuildIcon className="text-blue-600" fontSize="large" />
            <div>
              <h3 className="text-xl font-bold text-gray-700">Technologies</h3>
              <p className="text-gray-600 font-semibold">
                LangChain, PyTorch, FastAPI, ReactJS, MySQL/MongoDB
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Apropos;
