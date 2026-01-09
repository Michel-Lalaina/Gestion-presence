import { Button, Card, CardContent, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DownloadIcon from "@mui/icons-material/Download";
import AddStudentModal from "../components/AddStudentModal";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentQRModal from "../components/StudentQRModal";
import { getEtudiants } from "../services/Eleve";

const placeholderQR =
  "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=demo";

/* DONNÉES FALLBACK */
const fallbackStudents = [
  {
    id: 1,
    fullName: "Michelle Annicka",
    matricule: "E23456789",
    mention: "Physique",
    parcours: "Physique Nucléaire",
    niveau: "Doctorat",
    naissance: "07/11/1867",
    avatarUrl: "https://i.pravatar.cc/150?img=47",
    qrColor: "bg-gray-100",
  },
  {
    id: 2,
    fullName: "Aro Mampianina",
    matricule: "E12345678",
    mention: "Informatique",
    parcours: "Génie Logiciel",
    niveau: "Master 2",
    naissance: "15/05/1998",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
    qrColor: "bg-black",
  },
  {
    id: 3,
    fullName: "Toky Nomena",
    matricule: "E34567890",
    mention: "Physique",
    parcours: "Théorique",
    niveau: "Post-Doctorat",
    naissance: "14/03/1879",
    avatarUrl: "https://i.pravatar.cc/150?img=20",
    qrColor: "bg-gray-200",
  },
  {
    id: 4,
    fullName: "Mario",
    matricule: "E56789012",
    mention: "Mathématiques",
    parcours: "Algorithmique",
    niveau: "Licence 3",
    naissance: "10/12/1815",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    qrColor: "bg-green-900",
  },
];

export default function StudentCardsPage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openQRModal, setOpenQRModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [students, setStudents] = useState(fallbackStudents);

  /* GET AVEC FALLBACK */
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getEtudiants();

        if (!Array.isArray(data) || data.length === 0) {
          toast.info("Aucune donnée API, affichage des données locales");
          return;
        }

        const mapped = data.map((s: any) => ({
          id: s.id ?? s.matricule,
          fullName: `${s.nom} ${s.prenom}`,
          matricule: s.matricule,
          mention: s.mention,
          parcours: s.parcours,
          niveau: s.niveau,
          naissance: s.date_naissance,
          avatarUrl: "https://i.pravatar.cc/150",
          qrColor: "bg-gray-100",
        }));

        setStudents(mapped);
      } catch (error) {
        toast.error("Erreur API – données locales utilisées");
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const handleAddStudent = (data: any) => {
    setStudents((prev) => [
      ...prev,
      {
        id: Date.now(),
        fullName: `${data.nom} ${data.prenoms}`,
        matricule: data.matricule,
        mention: data.mention,
        parcours: data.parcours,
        niveau: data.niveau,
        naissance: data.naissance,
        avatarUrl: "https://i.pravatar.cc/150",
        qrColor: "bg-gray-100",
      },
    ]);
  };

  const handleDownload = () => {
    toast.success("Téléchargement non disponible pour le moment");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={5000} />
      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold">Cartes d’étudiant</h1>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="bg-green-600 normal-case hover:bg-green-700"
            onClick={() => setOpenAddModal(true)}
          >
            Générer une nouvelle carte
          </Button>
        </div>

        <AddStudentModal
          open={openAddModal}
          onClose={() => setOpenAddModal(false)}
          onSave={handleAddStudent}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
          {students.map((student) => (
            <Card
              key={student.id}
              className="p-6 rounded-2xl shadow-md flex flex-col gap-4"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar src={student.avatarUrl} sx={{ width: 56, height: 56 }} />
                  <div>
                    <div className="font-bold text-lg">{student.fullName}</div>
                    <div className="text-gray-500 text-sm">
                      Matricule: {student.matricule}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-20 h-20 rounded-md p-2 flex items-center justify-center ${student.qrColor}`}
                >
                  <img src={placeholderQR} alt="QR" className="w-full" />
                </div>
              </div>

              <CardContent className="bg-gray-100 rounded-xl text-sm leading-6">
                <div><strong>Mention:</strong> {student.mention}</div>
                <div><strong>Parcours:</strong> {student.parcours}</div>
                <div><strong>Niveau:</strong> {student.niveau}</div>
                <div><strong>Naissance:</strong> {student.naissance}</div>
              </CardContent>

              <div className="flex gap-3 mt-2">
                <Button
                  variant="outlined"
                  startIcon={<QrCodeIcon />}
                  className="normal-case border-gray-400 text-gray-700"
                  onClick={() => {
                    setSelectedStudent(student);
                    setOpenQRModal(true);
                  }}
                >
                  Générer QR
                </Button>

                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  className="normal-case bg-green-600 hover:bg-green-700"
                  onClick={handleDownload}
                >
                  Télécharger
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {selectedStudent && (
        <StudentQRModal
          open={openQRModal}
          onClose={() => setOpenQRModal(false)}
          matricule={selectedStudent.matricule}
          fullName={selectedStudent.fullName}
        />
      )}
    </div>
  );
}
