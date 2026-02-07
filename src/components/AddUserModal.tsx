// src/components/AddUserModal.tsx

import { useState } from "react";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: {
    noms: string;
    tel: string;
    role: string;
    email: string;
  }) => void;
}

export default function AddUserModal({
  open,
  onClose,
  onSave,
}: AddUserModalProps) {
  const [noms, setNoms] = useState("");
  const [tel, setTel] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!noms || !tel || !role || !email) return;

    onSave({ noms, tel, role, email });
    setNoms("");
    setTel("");
    setRole("");
    setEmail("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">Ajouter un utilisateur</h2>

        <div className="flex flex-col gap-4">
          <input
            placeholder="Nom complet"
            value={noms}
            onChange={(e) => setNoms(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            placeholder="Téléphone"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            placeholder="Rôle (Admin / Enseignant)"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="bg-black text-white px-4 py-2 rounded">
            Annuler
          </button>
          <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
