import { useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import Button from "@mui/material/Button";
import { loadSlim } from "tsparticles-slim";
import Typography from "@mui/material/Typography";
import photoP from "../../assets/image/dddddd3.jpeg";
import DownloadIcon from "@mui/icons-material/Download";


// Définition des animations
const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay } },
});

const Accueil: React.FC = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Fond animé */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-gray-300 to-slate-400 animate-gradient" />
      <div className="h-[500px] absolute top-0 left-0 w-full overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "transparent" },
            particles: {
              number: { value: 80, density: { enable: true, area: 700 } }, color: { value: "#00A8E8" }, shape: { type: "circle" },
              opacity: { value: 0.5 }, size: { value: 3, random: true }, move: { enable: true, speed: 1 },
              line_linked: { enable: true, distance: 120, color: "#00A8E8", opacity: 0.4, width: 1 },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" } },
              modes: { repulse: { distance: 80, duration: 0.4 } },
            },
          }}
          className="absolute w-full h-[500px]" />
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 px-10 flex items-center max-w-5xl mx-auto py-10">

        {/* Texte à gauche */}
        <div className="flex flex-col space-y-4 self-start text-left w-full text-white left-0">
          <motion.div variants={fadeIn(0.2)} initial="hidden" animate="visible">
            <Typography variant="h2" fontWeight="600" className="font-extrabold leading-snug">
              Bonjour, Je suis
            </Typography>
          </motion.div>

          <motion.div variants={fadeIn(0.4)} initial="hidden" animate="visible">
            <Typography variant="h2" fontWeight="700" className="text-blue-600">
              Michel Ramanantenasoa
            </Typography>

          </motion.div>
          <motion.div variants={fadeIn(0.6)} initial="hidden" animate="visible">
            <Typography variant="h6" fontWeight="600" className="text-gray-600">
              Et je suis <span className="font-extrabold text-blue-600">Software Engineer</span>
            </Typography>
          </motion.div>

          <motion.div variants={fadeIn(0.8)} initial="hidden" animate="visible">
            <div className="w-40">
              <Button variant="contained" startIcon={<DownloadIcon />}>
                CV
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Image à droite */}
        <motion.div variants={fadeIn(1.0)}  initial="hidden"  animate="visible"
          className="w-64 h-52 rounded-full overflow-hidden border-4 border-white shadow-2xl" >
          <img src={photoP} alt="Profile Picture" className="object-cover w-full h-full border-blue-400 " />
        </motion.div>
      </div>
    </div>
  );
};

export default Accueil;
