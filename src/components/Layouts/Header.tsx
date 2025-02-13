import Button from "@mui/material/Button";
import { Link as ScrollLink } from 'react-scroll';
import DarkMode from "@mui/icons-material/DarkMode";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg px-10 py-4 flex items-center justify-between z-50">
      {/* Logo */}
      <h1 className="text-blue-500 text-2xl font-bold tracking-wide">LM</h1>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-10 text-gray-800 font-medium">
        <ScrollLink 
          to="acc" 
          className="hover:text-blue-600 hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110">
          Accueil
        </ScrollLink>
        <ScrollLink 
          to="apro" 
          className="hover:text-blue-600 hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110">
          À propos
        </ScrollLink>
        <ScrollLink 
          to="compet" 
          className="hover:text-blue-600 hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110">
          Compétences
        </ScrollLink>
        <ScrollLink 
          to="projet" 
          className="hover:text-blue-600 hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110">
          Projets
        </ScrollLink>
        <ScrollLink 
          to="contact" 
          className="hover:text-blue-600 hover:cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110">
          Contact
        </ScrollLink>
      </nav>

      {/* CTA Button */}
      <Button 
        variant="contained" 
        color="primary" 
        className="hidden md:block shadow-md hover:scale-105 transition-transform"
      >
        <DarkMode />
      </Button>
    </header>
  );
};

export default Header;
