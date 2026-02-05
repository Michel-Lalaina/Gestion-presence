import { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";
 import { markPresence } from "../services/Eleve";

interface Props {
  onClose: () => void;
}

export default function QRCodeScanner({ onClose }: Props) {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          await markPresence({
            matricule: decodedText,
          });

          toast.success("Présence enregistrée");
          scanner.clear();
          onClose();
        } catch (error) {
          toast.error("QR invalide ou étudiant non trouvé");
          console.error(error);
        }
      },
      () => {}
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-[380px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold mb-3 text-center">
          Scanner le QR Code
        </h2>

        <div id="qr-reader" />
      </div>
    </div>
  );
}
