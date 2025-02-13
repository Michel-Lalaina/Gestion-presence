import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import adrianaImg from "../../assets/image/IA.png";
import CardContent from "@mui/material/CardContent";
import assistImg from "../../assets/image/ai-technology.jpg";
import exempleImg from "../../assets/image/Projetprofessionnel.jpg.webp";


const projects = [
  {
    name: "Adriana",
    description: "L'IA qui simplifie vos calculs d'impôts en moins de 10 questions !",
    tags: ["LangChain", "PyTorch", "FastAPI", "LLM", "STT", "TTS"],
    image: adrianaImg,
    link: "#",
  },
  {
    name: "TAM",
    description: "Platforme web pour le suivi des vols",
    tags: ["FastAPI", "React", "Node"],
    image: exempleImg,
    link: "#",
  },
  {
    name: "Assist IA",
    description:
      "Assist est une IA proactive qui génère des réponses et du contenu, offrant une assistance personnalisée pour divers secteurs.",
    tags: ["LLM", "Python", "FastAPI", "JS"],
    image: assistImg,
    link: "#",
  },
];

const Projects: React.FC = () => {
  return (
    <div className="relative md:flex-row items-center md:items-start gap-12 p-20 bg-gray-100 rounded-2xl overflow-hidden ">
      <h2 className="text-3xl font-bold text-center mb-8">Mes projets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="shadow-white rounded-lg hover:shadow-xl transition-shadow duration-300">
            <CardMedia component="img" height="100" width="200" image={project.image} alt={project.name} />
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
               
                <Typography variant="body2" className="text-blue-500">
                  IA
                </Typography>
              </div>
              <Typography variant="h6" className="font-semibold">
                {project.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" className="mt-2">
                {project.description}
              </Typography>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, i) => (
                  <Chip key={i} label={tag} color="primary" />
                ))}
              </div>
              <div className="flex items-center text-blue-500 mt-4 hover:underline">
                Voir le projet 
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Projects;
