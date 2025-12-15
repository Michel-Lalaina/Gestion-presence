import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "react-qr-code";

interface StudentQRModalProps {
  open: boolean;
  onClose: () => void;
  matricule: string;
  fullName: string;
}

export default function StudentQRModal({
  open,
  onClose,
  matricule,
  fullName,
}: StudentQRModalProps) {
  const qrValue = `${matricule}-${fullName}`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle className="flex justify-between items-center">
        QR Code Étudiant
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="flex flex-col items-center gap-6 py-10">
        <QRCode value={qrValue} size={260} />

        <div className="text-center">
          <div className="font-bold text-lg">{fullName}</div>
          <div className="text-gray-600">Matricule : {matricule}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
