import { GitHub, LinkedIn, Twitter, Email } from "@mui/icons-material";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-500 via-gray-600 to-gray-800 text-white py-8">
      {/* Effet d'arrière-plan */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_10%,_transparent_10%)] bg-[size:2rem_2rem] opacity-10"></div>

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Logo & Nom */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl font-bold tracking-wide">Michel Lalaina Ramanantenasoa</h1>
          <p className="text-gray-400 text-sm mt-1">© 2025 Tous droits réservés.</p>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-transform transform hover:scale-125">
            <GitHub fontSize="large" />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-500 transition-transform transform hover:scale-125">
            <LinkedIn fontSize="large" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-transform transform hover:scale-125">
            <Twitter fontSize="large" />
          </a>
          <a href="mailto:michel.ramanantenasoa@example.com" className="text-gray-300 hover:text-red-400 transition-transform transform hover:scale-125">
            <Email fontSize="large" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
