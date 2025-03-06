import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import adrianaImg from "../../assets/image/IA.png";
import assistImg from "../../assets/image/qcm.png";
import exempleImg from "../../assets/image/L3.png";
import CardContent from "@mui/material/CardContent";


const projects = [
  {
    name: "Lm chat",
    description: "L'IA qui vous aide a vos calculs et evaluer votre capaciter a resonner!",
    tags: ["ReactJS", "FastAPI", "ORM : sqlalchemy"],
    image: adrianaImg,
    link: "#",
  },
  {
    name: "TAM",
    description: "Platforme web pour le suivi des vols et gestion de maintenance des avions",
    tags: [ "React", "Node", "Tailwind CSS", "ORM : Sequilize"],
    image: exempleImg,
    link: "#",
  },
  {
    name: "Qcm_CAP",
    description:
      "Qcm_cap est une application mobile de quiz pour evaluer et tester un cadidat en ligne.",
    tags: [ "NodeJS", "NextJS", "ORM : Prisma"],
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
                  APK
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
