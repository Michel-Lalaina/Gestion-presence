// src/components/AddStudentModal.tsx
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "react-qr-code";

interface FormState {
  matricule: string;
  naissance: string;
  nom: string;
  prenoms: string;
  mention: string;
  parcours: string;
  niveau: string;
  qrCode: string;
}

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormState) => void; // ✅ AJOUT
}


export default function AddStudentModal({
  open,
  onClose,
  onSave,
}: AddStudentModalProps) {
  const [form, setForm] = useState<FormState>({
    matricule: "",
    naissance: "",
    nom: "",
    prenoms: "",
    mention: "",
    parcours: "",
    niveau: "",
    qrCode: "",
  });


  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const generateQR = () => {
    const base = `${form.matricule}-${form.nom}-${form.prenoms}`;
    const normalized = base.replace(/(^-|-$)/g, "").trim();
    setForm((prev) => ({
      ...prev,
      qrCode: normalized === "" ? "Aucun" : normalized,
    }));
  };

  const handleSave = () => {
    if (!form.nom.trim() || !form.matricule.trim()) {
      toast.error("Information obligatoire non remplie");
      return;
    }


    toast.success("Étudiant ajouté avec succès !");
      onSave(form); 
    onClose();
  };

  return (
    <>
      {/* TOAST */}
      <ToastContainer position="top-right" autoClose={5000} />

      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ className: "rounded-2xl" }}
      >
        <DialogTitle className="flex justify-between items-center px-6 pt-6">
          <span className="text-xl font-bold">
            Ajouter un nouvel étudiant
          </span>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="px-6 pb-6">
          <div className="w-full border-t my-3" />

          <div className="grid grid-cols-3 gap-10">
            <div className="col-span-2 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-5">
                <TextField
                  label="Matricule"
                  fullWidth
                  value={form.matricule}
                  onChange={handleChange("matricule")}
                />

                <TextField
                  label="Date de naissance"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  value={form.naissance}
                  onChange={handleChange("naissance")}
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <TextField
                  label="Nom"
                  fullWidth
                  value={form.nom}
                  onChange={handleChange("nom")}
                />

                <TextField
                  label="Prénoms"
                  fullWidth
                  value={form.prenoms}
                  onChange={handleChange("prenoms")}
                />
              </div>

              <TextField
                label="Mention"
                fullWidth
                value={form.mention}
                onChange={handleChange("mention")}
              />

              <TextField
                label="Parcours"
                fullWidth
                value={form.parcours}
                onChange={handleChange("parcours")}
              />

              <TextField
                label="Niveau"
                fullWidth
                value={form.niveau}
                onChange={handleChange("niveau")}
              />
            </div>

            <div className="bg-gray-100 rounded-xl p-6 flex flex-col items-center shadow-inner">
              <p className="text-center font-semibold mb-4">
                QR Code de l'étudiant
              </p>

              <div className="bg-white p-4 rounded-xl shadow mb-4">
                {form.qrCode ? (
                  <QRCode value={form.qrCode} size={180} />
                ) : (
                  <div className="w-[180px] h-[180px] flex items-center justify-center text-gray-400">
                    Aucun QR Code
                  </div>
                )}
              </div>

              <Button
                variant="contained"
                className="normal-case bg-gray-700 hover:bg-gray-800"
                onClick={generateQR}
              >
                Générer QR Code
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            <Button variant="outlined" onClick={onClose}>
              Annuler
            </Button>

            <Button
              variant="contained"
              className="bg-green-600 hover:bg-green-700"
              onClick={handleSave}
            >
              Enregistrer
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
