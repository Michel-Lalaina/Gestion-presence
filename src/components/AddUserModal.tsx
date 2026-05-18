// src/components/AddUserModal.tsx

import { useState, useEffect } from "react";

interface NewUser {
  nom: string;
  prenom: string;
  contact : string;
  role: string;
  email: string;
  password: string;
}

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: NewUser) => void;
  editingUser?: any;
}

export default function AddUserModal({ open, onClose, onSave, editingUser }: AddUserModalProps) {
  const [nom, setnom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (editingUser) {
      setnom(editingUser.nom);
      setPrenom(editingUser.prenom);
      setContact(editingUser.contact  );
      setRole(editingUser.role);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  if (!open) return null;

  const handleSave = () => {
    if (!nom || !prenom || !contact || !role || !email) return;

    onSave({ nom, prenom, contact, role, email, password: "123456" });

    // Reset
    setnom("");
    setPrenom("");
    setContact("");
    setRole("");
    setEmail("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-[420px] shadow-xl">
        <h2 className="text-xl font-bold mb-4">{editingUser ? "Modifier utilisateur" : "Ajouter un utilisateur"}</h2>

        <div className="flex flex-col gap-4">
          <input placeholder="Prénom" value={nom} onChange={(e) => setnom(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Nom" value={prenom} onChange={(e) => setPrenom(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Téléphone" value={contact} onChange={(e) => setContact(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Rôle (Admin / Enseignant)" value={role} onChange={(e) => setRole(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg px-4 py-2" />
          <input placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="border rounded-lg px-4 py-2" />
        </div>

        <div className="flex text-white justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-black">Annuler</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-green-600">{editingUser ? "Enregistrer" : "Ajouter"}</button>
        </div>
      </div>
    </div>
  );
}
