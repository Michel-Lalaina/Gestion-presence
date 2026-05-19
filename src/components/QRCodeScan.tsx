import { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { toast } from "react-toastify";
import { markPresence } from "../services/Eleve";

interface Props {
  onClose: (matricule: string) => void;
}

export default function QRCodeScanner({ onClose }: Props) {
  /**
   * scannerRef :
   * garde UNE seule instance du scanner
   */
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [decodedText, setDecodedText] = useState("");

  /**
   * hasScannedRef :
   * empêche qu’un même QR soit traité 2 fois
   */
  const hasScannedRef = useRef(false);

  useEffect(() => {
    /**
     * Si le scanner existe déjà,
     * on ne recrée pas une deuxième caméra
     */
    if (scannerRef.current) return;

    scannerRef.current = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false
    );

    scannerRef.current.render(
      async (decodedText) => {
        setDecodedText(decodedText);
        /**
         * Si déjà scanné → stop
         */
        if (hasScannedRef.current) return;

        /**
         * verrouillage anti double scan
         */
        hasScannedRef.current = true;

        try {
          await markPresence({
            matricule: decodedText,
          });

          toast.success("Présence enregistrée");

          /**
           * stop caméra
           */
          await scannerRef.current?.clear();

          /**
           * reset scanner
           */
          scannerRef.current = null;

          /**
           * fermer modal
           */
          onClose(decodedText);

        } catch (error) {
          /**
           * si erreur → autoriser un nouveau scan
           */
          hasScannedRef.current = false;

          toast.error("QR invalide ou étudiant non trouvé");
          console.error(error);
        }
      },
      () => {}
    );

    return () => {
      /**
       * nettoyage quand composant détruit
       */
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-4 w-[380px] relative">
        <button
          onClick={() => onClose(decodedText)}
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