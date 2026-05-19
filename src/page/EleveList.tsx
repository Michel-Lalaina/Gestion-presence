import { Button, Card, CardContent, Avatar, CircularProgress, TextField, MenuItem } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DownloadIcon from "@mui/icons-material/Download";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import AddStudentModal from "../components/AddStudentModal";
import StudentQRModal from "../components/StudentQRModal";
import { getEtudiants } from "../services/Eleve";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setMention, setNiveau, setParcours } from "../store/filterEleveSlice";

const placeholderQR =
  "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=demo";

export default function StudentCardsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openQRModal, setOpenQRModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  interface CardConfig {
    width: number;
    height: number;
    cornerRadius: number;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    textColor: string;
    lightTextColor: string;
  }

  const defaultCardConfig: CardConfig = {
    width: 180,
    height: 110,
    cornerRadius: 10,
    primaryColor: "#1E3A8A",
    secondaryColor: "#3B82F6",
    accentColor: "#60A5FA",
    textColor: "#1F2937",
    lightTextColor: "#6B7280",
  };

  const dispatch = useDispatch();

  const studentsFilter = useSelector(
    (state: RootState) => state.students_filter_store
  );

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
          avatarUrl: "https://i.pravatar.cc/" + s.id,
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

  const handleDownload = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    matricule: string
  ) => {
    e.preventDefault();

    try {
      const student = students.find((s) => s.matricule === matricule);

      if (!student) {
        toast.error("Étudiant introuvable");
        return;
      }

      // Générer le QR code à partir du matricule
      const qrCodeDataUrl = await QRCode.toDataURL(student.matricule, {
        width: 200,
        margin: 1,
      });

      // Création PDF
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Titre
      doc.setFontSize(18);
      doc.text("Carte Étudiant", 80, 20);

      // Cadre carte
      doc.rect(20, 30, 170, 90);

      // Informations étudiant
      doc.setFontSize(12);

      doc.setTextColor(defaultCardConfig.lightTextColor);
      doc.setFontSize(9);
      doc.setTextColor(defaultCardConfig.textColor);
      doc.text(`Nom complet : ${student.fullName}`, 30, 45);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(`Matricule : ${student.matricule}`, 30, 55);
      doc.text(`Mention : ${student.mention}`, 30, 65);
      doc.text(`Parcours : ${student.parcours}`, 30, 75);
      doc.text(`Niveau : ${student.niveau}`, 30, 85);
      doc.text(`Naissance : ${student.naissance}`, 30, 95);

      // QR Code
      doc.addImage(qrCodeDataUrl, "PNG", 130, 45, 40, 40);

      // Télécharger
      doc.save(`Carte_${student.matricule}.pdf`);

      toast.success("PDF généré avec succès");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la génération du PDF");
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchMention =
      !studentsFilter.mention ||
      student.mention === studentsFilter.mention;

    const matchParcours =
      !studentsFilter.parcours ||
      student.parcours === studentsFilter.parcours;

    const matchNiveau =
      !studentsFilter.niveau ||
      student.niveau === studentsFilter.niveau;
    console.log(matchMention, matchParcours, matchNiveau);

    return matchMention && matchParcours && matchNiveau;
  });

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={4000} />

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold">Cartes d’étudiant</h1>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddModal(true)}
            className=" normal-case px-6 py-2.5  rounded-xl bg-gradient-to-r from-green-500 via-emerald-500 to-green-600
          text-white shadow-md hover:shadow-green-200/50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all
            duration-200 font-semibold"
            sx={{
              textTransform: "none",
            }}
          >
            Générer une carte
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

            <TextField
              label="Mention"
              select
              fullWidth
              value={studentsFilter.mention}
              onChange={(e) => dispatch(setMention(e.target.value))}
              className="
    bg-white/60 backdrop-blur-sm
    rounded-lg shadow 
    hover:shadow-md
    transition-all duration-150
  "
              InputLabelProps={{
                className: "text-gray-500 font-medium",
              }}
              InputProps={{
                className: "rounded-lg py-1",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  minHeight: "42px",
                },
                "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "#d3d6de" },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#bfc3cc !important",
                },
              }}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="Informatique">Informatique</MenuItem>
              <MenuItem value="Intelligence Artificielle">Intelligence artificielle</MenuItem>
            </TextField>

            <TextField
              label="Parcours"
              select
              fullWidth
              value={studentsFilter.parcours}
              onChange={(e) => dispatch(setParcours(e.target.value))}
              className="
    bg-white/60 backdrop-blur-sm
    rounded-lg shadow 
    hover:shadow-md
    transition-all duration-150
  "
              InputLabelProps={{
                className: "text-gray-500 font-medium",
              }}
              InputProps={{
                className: "rounded-lg py-1",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  minHeight: "42px",
                },
                "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "#d3d6de" },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#bfc3cc !important",
                },
              }}
            >
              {studentsFilter.mention == "Informatique" && (
                <MenuItem value="GB">Génie Logiciel et Base de donnée</MenuItem>
              )}
              {studentsFilter.mention == "Informatique" && (
                <MenuItem value="SR">Système et Réseau</MenuItem>
              )}
              {studentsFilter.mention == "Informatique" && (
                <MenuItem value="IG">Informatique Générale</MenuItem>
              )}
              {studentsFilter.mention == "Intelligence Artificielle" && (
                <MenuItem value="GID">Gouvernance et Ingénierie de Donnée</MenuItem>
              )}
              {studentsFilter.mention == "Intelligence Artificielle" && (
                <MenuItem value="OCC">Objet Connecté et Cybersécurité</MenuItem>
              )}
            </TextField>

            <TextField
              label="Niveau"
              select
              fullWidth
              value={studentsFilter.niveau}
              onChange={(e) => dispatch(setNiveau(e.target.value))}
              className="
                           bg-white/60 backdrop-blur-sm
                          rounded-lg shadow 
                          hover:shadow-md
                         transition-all duration-150
                        "
              InputLabelProps={{
                className: "text-gray-500 font-medium",
              }}
              InputProps={{
                className: "rounded-lg py-1",
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  minHeight: "42px",
                },
                "& .MuiOutlinedInput-root:hover fieldset": { borderColor: "#d3d6de" },
                "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                  borderColor: "#bfc3cc !important",
                },
              }}
            >
              <MenuItem value="L1">L1</MenuItem>
              <MenuItem value="L2">L2</MenuItem>
              <MenuItem value="L3">L3</MenuItem>
              <MenuItem value="M1">M1</MenuItem>
              <MenuItem value="M2">M2</MenuItem>
            </TextField>

            {filteredStudents.map((student) => (
              <Card
                key={student.id}
                className="p-5 rounded-2xl shadow-md flex flex-col gap-4"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar src={student.avatarUrl} sx={{ width: 48, height: 48 }} />
                    <div>
                      <div className="font-semibold text-base">{student.fullName}</div>
                      <div className="text-gray-500 text-xs">
                        Matricule: {student.matricule}
                      </div>
                    </div>
                  </div>

                  <div className="w-16 h-16 rounded-md p-2 flex items-center justify-center bg-gray-100">
                    <img src={placeholderQR} alt="QR" className="w-full" />
                  </div>
                </div>

                {/* INFO CARD */}
                <CardContent className="bg-white border rounded-xl text-sm leading-6 p-4 shadow-sm">
                  <div><strong>Mention:</strong> {student.mention}</div>
                  <div><strong>Parcours:</strong> {student.parcours}</div>
                  <div><strong>Niveau:</strong> {student.niveau}</div>
                  <div><strong>Naissance:</strong> {student.naissance}</div>
                </CardContent>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-1">
                  <Button
                    variant="outlined"
                    startIcon={<QrCodeIcon />}
                    size="small"
                    className="normal-case border-gray-400 text-gray-700 px-2"
                    onClick={() => {
                      setSelectedStudent(student);
                      setOpenQRModal(true);
                    }}
                  >
                    QR
                  </Button>

                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    size="small"
                    className="normal-case bg-green-600 hover:bg-green-700 px-2"
                    onClick={e => handleDownload(e, student.matricule)}
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
