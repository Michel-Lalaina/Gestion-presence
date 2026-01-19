import { Button, Card, CardContent, Avatar, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DownloadIcon from "@mui/icons-material/Download";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentModal from "../components/AddStudentModal";
import StudentQRModal from "../components/StudentQRModal";
import { getEtudiants } from "../services/Eleve";

const placeholderQR =
  "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=demo";

export default function StudentCardsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openQRModal, setOpenQRModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEtudiants();

      if (!Array.isArray(data)) {
        setStudents([]);
        return;
      }

      setStudents(
        data.map((s: any) => ({
          id: s.id ?? s.matricule,
          fullName: `${s.nom} ${s.prenom}`,
          matricule: s.matricule,
          mention: s.mention,
          parcours: s.parcours,
          niveau: s.niveau,
          naissance: s.date_naissance,
          avatarUrl: "https://i.pravatar.cc/150",
          qrColor: "bg-gray-100",
        }))
      );
    } catch (error) {
      toast.error("Erreur lors du chargement des étudiants");
      console.error(error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleAddStudent = async () => {
    setOpenAddModal(false);
    await fetchStudents();
    toast.success("Étudiant ajouté avec succès");
  };

  const handleDownload = () => {
    toast.info("Téléchargement non disponible pour le moment");
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={4000} />

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

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center mt-20">
            <CircularProgress />
          </div>
        )}

        {/* EMPTY */}
        {!loading && students.length === 0 && (
          <div className="text-center text-gray-500 mt-20 text-lg">
            Aucun étudiant disponible
          </div>
        )}

        {/* LIST */}
        {!loading && students.length > 0 && (
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

                  <div className="w-20 h-20 rounded-md p-2 flex items-center justify-center bg-gray-100">
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
        )}
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
