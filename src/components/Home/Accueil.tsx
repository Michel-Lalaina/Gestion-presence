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
      <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-gray-300 to-slate-400 animate-gradient" />
      <div className="h-[500px] absolute top-0 left-0 w-full overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: "transparent" },
            particles: {
              number: { value: 90, density: { enable: true, area: 700 } },
              color: { value: "#5A5A5A" },
              shape: { type: "circle" },
              opacity: { value: 0.5 },
              size: { value: 3, random: true },
              move: { enable: true, speed: 1 },
              line_linked: { enable: true, distance: 120, color: "#5A5A5A", opacity: 0.5, width: 1 },
            },
            interactivity: {
              events: { onHover: { enable: true, mode: "repulse" } },
              modes: { repulse: { distance: 80, duration: 0.4 } },
            },
          }}
          className="absolute w-full h-[500px]"
        />
      </div>
  
      {/* Contenu principal */}
      <div className="relative z-10 px-6 sm:px-10 flex flex-col md:flex-row items-center max-w-5xl mx-auto py-10 text-center md:text-left">
        {/* Texte à gauche */}
        <div className="flex flex-col space-y-4 w-full text-white md:self-start">
          <motion.div variants={fadeIn(0.2)} initial="hidden" animate="visible">
            <Typography variant="h2" fontWeight="800" className="font-extrabold leading-snug">
              Bonjour, Je suis
            </Typography>
          </motion.div>
          <motion.div variants={fadeIn(0.4)} initial="hidden" animate="visible">
            <Typography variant="h2" fontWeight="800" className="text-blue-600">
              Michel Ramanantenasoa
            </Typography>
          </motion.div>
          <motion.div variants={fadeIn(0.6)} initial="hidden" animate="visible">
            <Typography variant="h6" fontWeight="600" className="text-gray-600">
              Et je suis <span className="font-extrabold text-blue-600">Software Engineer</span>
            </Typography>
          </motion.div>
          <motion.div variants={fadeIn(0.8)} initial="hidden" animate="visible">
            <div className="w-40 mx-auto md:mx-0">
              <Button variant="contained" startIcon={<DownloadIcon />} className="hover:scale-110 ease-in-out transition">
                CV
              </Button>
            </div>
          </motion.div>
        </div>
  
        {/* Image à droite */}
        <motion.div
          variants={fadeIn(1.0)}
          initial="hidden"
          animate="visible"
          className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-64 rounded-full overflow-hidden border-8 border-white shadow-2xl mt-6 md:mt-0"
        >
          <img src={photoP} alt="Profile Picture" className="object-cover w-full h-full border-blue-400" />
        </motion.div>
      </div>
    </div>
  );
};

export default Accueil;
