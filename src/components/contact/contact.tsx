
import Send  from "@mui/icons-material/Send";
import  Email from "@mui/icons-material/Email";
import Phone  from "@mui/icons-material/Phone";
import  LinkedIn from "@mui/icons-material/LinkedIn";

const Contact = () => {


 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé !");
  };

  return (
     <div className=" relative md:flex-row items-center md:items-start gap-12 p-20 bg-white rounded-3xl overflow-hidden ">
      <h2 className="text-4xl font-bold text-center mb-8">Contact</h2>
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Section Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Me contacter</h3>
          <p className="text-gray-600 mb-4">
            N'hésitez pas à me contacter pour discuter de vos projets ou pour toute autre question.
          </p>
          <ul className="space-y-3 text-blue-500">
            <li className="flex items-center gap-2">
              <Email /> <a href="https://gmail.com/">michelramanantenasoa@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <LinkedIn /> <a href="https://linkedin.com/">LinkedIn</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone /> <a href="tel:+261340309755">Whatsapp : +261 34 03 097 55</a>
            </li>
            <li className="flex items-center gap-2">
              <Phone /> <a href="tel:+261340309755">+261 34 03 097 55</a>
            </li>
          </ul>
        </div>

        {/* Formulaire de contact */}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div>
            <label className="block text-gray-700 font-medium">Nom</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded "
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Message</label>
            <textarea
              name="message"
              className="w-full p-2 border rounded h-28"
              placeholder="Votre message..."
            />
          </div>
          <button type="submit" className="w-40 bg-blue-500 text-white py-2 flex justify-center items-center gap-2 rounded hover:bg-blue-600">
            <Send /> Envoyer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
