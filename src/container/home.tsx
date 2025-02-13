import Accueil from "../components/Home/Accueil";
import Footer from "../components/Layouts/footer";
import Header from "../components/Layouts/Header";
import Projects from "../components/Projets/projet";
import Apropos from "../components/Apropos/apropos";
import Contact from "../components/contact/contact";
import Competences from "../components/Competance/skills";


const Profile: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <div className="flex flex-col items-center h-full">
        {/* Accueil */}
        <div id="acc" className="mb-"> 
          <Accueil />
        </div>

        <div id="apro" className="mb-40 top-4 bg-slate-100 w-screen"> 
          <Apropos />
        </div> 

        <div id="compet" className="mb-40 w-full top-4"> 
          <Competences/>
        </div> 

        <div id="projet" className="mb-40 w-full"> 
          <Projects />
        </div> 
        
        <div id="contact" className="mb-40 w-full"> 
          <Contact/>
        </div> 

        <div id="footer" className=" w-full"> 
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
