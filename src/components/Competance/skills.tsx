import  Card   from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {  Psychology,  Storage,  Code,  IntegrationInstructions,  Settings,  GitHub} from "@mui/icons-material";

const skills = [
  {
    title: "Intelligence Artificielle",
    icon: <Psychology className="text-blue-500" />,
    items: [  "Maîtrise en droit (LL.M.)",  "STT",  "TTS",  "Chaîne de langue",  "PyTorch",  "MLOps",  "Transformateurs",
      "CHIFFON",  "Réglage fin",  "Réglage rapide",  "Néo4j",  "Chromadb",  "Grandes lignes",  ],
  },
  {
    title: "Cadres",
    icon: <IntegrationInstructions className="text-blue-500" />,
    items: ["CodeIgniter", "Spring boot", "VueJs", "Quasar", "Django", "Qt", "ReactJs", "Tailwind CSS", "API rapide"],
  },
  {
    title: "Base de données",
    icon: <Storage className="text-blue-500" />,
    items: ["MySQL", "PostgreSQL", "Base de feu", "MongoDB"],
  },
  {
    title: "Langages de programmation",
    icon: <Code className="text-blue-500" />,
    items: ["Java", "Javascript", "Python"],
  },
  {
    title: "Méthodologies de Travail",
    icon: <Settings className="text-blue-500" />,
    items: ["2TUP", "Merise", "UML", "Agile (scrum)"],
  },
  {
    title: "Gestionnaire de version",
    icon: <GitHub className="text-blue-500" />,
    items: ["Git", "GitLab"],
  },
];

const Competences: React.FC = () => {
  return (
    <div className="relative md:flex-row items-center md:items-start gap-12 p-20 bg-white rounded-2xl overflow-hidden ">
      <h2 className="text-3xl font-bold text-center mb-8">Compétences en informatique</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <Card key={index} className="shadow-lg rounded-lg hover:scale-105 ease-in-out transition">
            <CardContent>
              <div className="flex items-center gap-2 mb-4">
                {skill.icon}
                <h3 className="text-lg font-semibold">{skill.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-600 px-3 py-1 text-sm rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Competences;
