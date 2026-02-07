// src/components/AddUserModal.tsx

import { useState, useEffect } from "react";

interface NewUser {
  firstname: string;
  lastname: string;
  tel: string;
  role: string;
  email: string;
}

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: NewUser) => void;
  editingUser?: any;
}

export default function AddUserModal({ open, onClose, onSave, editingUser }: AddUserModalProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [tel, setTel] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setFirstname(editingUser.firstname);
      setLastname(editingUser.lastname);
      setTel(editingUser.tel);
      setRole(editingUser.role);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  if (!open) return null;

  const handleSave = () => {
    if (!firstname || !lastname || !tel || !role || !email) return;

    onSave({ firstname, lastname, tel, role, email });

    // Reset
    setFirstname("");
    setLastname("");
    setTel("");
    setRole("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">{editingUser ? "Modifier utilisateur" : "Ajouter un utilisateur"}</h2>

        <div className="flex flex-col gap-4">
          <input placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Nom" value={lastname} onChange={(e) => setLastname(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Téléphone" value={tel} onChange={(e) => setTel(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Rôle (Admin / Enseignant)" value={role} onChange={(e) => setRole(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg px-4 py-2" />
        </div>

        <div className="flex text-white justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-black">Annuler</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-600">{editingUser ? "Enregistrer" : "Ajouter"}</button>
        </div>
      </div>
    </div>
  );
}
