
import { Button, Card, CardContent, Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import QrCodeIcon from "@mui/icons-material/QrCode";
import DownloadIcon from "@mui/icons-material/Download";


// crucial: placeholder QR images until API is ready
const placeholderQR = "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=demo";

const studentsData = [
    {
        id: 1,
        fullName: "Marie Curie",
        matricule: "E23456789",
        mention: "Physique",
        parcours: "Physique Nucléaire",
        niveau: "Doctorat",
        naissance: "07/11/1867",
        avatarUrl: "https://i.pravatar.cc/150?img=47",
        qrColor: "bg-gray-100"
    },
    {
        id: 2,
        fullName: "Jean Dupont",
        matricule: "E12345678",
        mention: "Informatique",
        parcours: "Génie Logiciel",
        niveau: "Master 2",
        naissance: "15/05/1998",
        avatarUrl: "https://i.pravatar.cc/150?img=12",
        qrColor: "bg-black"
    },
    {
        id: 3,
        fullName: "Albert Einstein",
        matricule: "E34567890",
        mention: "Physique",
        parcours: "Théorique",
        niveau: "Post-Doctorat",
        naissance: "14/03/1879",
        avatarUrl: "https://i.pravatar.cc/150?img=20",
        qrColor: "bg-gray-200"
    },
    {
        id: 4,
        fullName: "Ada Lovelace",
        matricule: "E56789012",
        mention: "Mathématiques",
        parcours: "Algorithmique",
        niveau: "Licence 3",
        naissance: "10/12/1815",
        avatarUrl: "https://i.pravatar.cc/150?img=5",
        qrColor: "bg-green-900"
    }
];

export default function StudentCardsPage() {
    return (
    
            
            <div className="flex w-full min-h-screen bg-gray-50">



                {/* MAIN */}
                <main className="flex-1 p-10">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-4xl font-extrabold">Cartes d’étudiant</h1>

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            className="bg-green-600 normal-case hover:bg-green-700"
                        >
                            Générer une nouvelle carte
                        </Button>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
                        {studentsData.map((student) => (
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

                                    <div className={`w-20 h-20 rounded-md p-2 flex items-center justify-center ${student.qrColor}`}>
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
                                    >
                                        Générer QR
                                    </Button>

                                    <Button
                                        variant="contained"
                                        startIcon={<DownloadIcon />}
                                        className="normal-case bg-green-600 hover:bg-green-700"
                                    >
                                        Télécharger
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </main>

            </div>
    );
}
