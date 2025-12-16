import { useState } from "react";

interface NewUser {
  name: string;
  role: string;
  email: string;
}

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: NewUser) => void;
}

export default function AddUserModal({
  open,
  onClose,
  onSave,
}: AddUserModalProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!name || !role || !email) return;

    onSave({
      name,
      role,
      email,
    });

    setName("");
    setRole("");
    setEmail("");
    onClose();
  };

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
  {/* MODALE SEULE — AUCUN BACKDROP */}
  <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
    <h2 className="text-xl font-bold mb-4">
      Ajouter un utilisateur
    </h2>

    <div className="flex flex-col gap-4">
      <input
        placeholder="Nom complet"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg border"
      >
        Annuler
      </button>

      <button
        onClick={handleSave}
        className="px-4 py-2 rounded-lg bg-green-600 text-white"
      >
        Ajouter
      </button>
    </div>
  </div>
</div>

  );
}
