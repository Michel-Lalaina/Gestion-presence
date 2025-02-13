
import  Button from "@mui/material/Button";
import DarkMode from "@mui/icons-material/DarkMode";


const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-lg px-10 py-4 flex items-center justify-between z-50">
      {/* Logo */}
      <h1 className="text-blue-500 text-2xl font-bold tracking-wide">LM</h1>

      {/* Navigation */}
      <nav className="hidden md:flex space-x-6 text-gray-800 font-medium">
        <a href="#acc" className="hover:text-blue-500 transition">Accueil</a>
        <a href="#apro" className="hover:text-blue-500 transition">À propos</a>
        <a href="#compet" className="hover:text-blue-500 transition">Compétences</a>
        <a href="#projet" className="hover:text-blue-500 transition">Projets</a>
        <a href="#contact" className="hover:text-blue-500 transition">Contact</a>
      </nav>

      {/* CTA Button */}
      <Button variant="contained" color="primary" className="hidden md:block shadow-md hover:scale-105 transition-transform">
        <DarkMode/>
      </Button>
    </header>
  );
};   
export default Header;
