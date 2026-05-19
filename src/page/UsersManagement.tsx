
// src/page/UsersManagement.tsx

import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserModal from "../components/AddUserModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListUsers, createUser, updateUser, deleteUser } from "../services/User";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  tel: string;
  role: string;
  email: string;
  lastLogin: string;
  roleColor: string;
}
interface user{
  contact: string,
    email: string,
    id: number,
    nom: string,
    prenom: string,
    role: string
}

const USERS_PER_PAGE = 5;

export default function UsersManagement() {
  const [users, setUsers] = useState<user[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [editingUser, setEditingUser] = useState<user | null>(null);

  // Simuler utilisateur connecté
  const [currentUser] = useState<User>({
    id: 1,
    firstname: "Michel",
    lastname: "Lalaina",
    tel: "00000000",
    role: "Admin",
    email: "michelramanantenasoa@gmail.com",
    lastLogin: "Aujourd'hui à 10h00",
    roleColor: "bg-green-200 text-green-700",
  });

  // Charger la liste depuis le backend
  const fetchUsers = async () => {
    try {
      const data = await getListUsers();
      setUsers(
        data.map((u: any) => ({
          ...u,
          roleColor:
            u.role === "Admin"
              ? "bg-green-200 text-green-700"
              : "bg-blue-200 text-blue-700",
        }))
      );
    } catch (err) {
      toast.error("Erreur lors de la récupération des utilisateurs");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);
  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleAddUser = async (user: Omit<user, "id" | "lastLogin" | "roleColor">) => {
    try {
      if (editingUser) {
        // Modifier
        await updateUser(editingUser.id, user);
        toast.success("Utilisateur mis à jour");
      } else {
        // Ajouter
        await createUser({
          nom: `${user.nom} ${user.prenom}`,
          prenom: user.prenom,
          email: user.email,
          role: user.role,
          contact: user.contact,
          password: "123456" // Mot de passe par défaut, à changer après la création
        });
        toast.success("Utilisateur ajouté");
      }
      setEditingUser(null);
      setOpenModal(false);
      fetchUsers();
    } catch {
      toast.error("Erreur lors de l'opération");
    }
  };

  const handleDeleteUser = async (user: user) => {
    if (currentUser.role !== "Admin") {
      toast.error("Seul un admin peut supprimer des utilisateurs");
      return;
    }
    if (user.id === currentUser.id) {
      toast.error("Vous ne pouvez pas vous supprimer vous-même");
      return;
    }

    try {
      await deleteUser(user.id);
      toast.success("Utilisateur supprimé");
      fetchUsers();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const handleEditUser = (user: user) => {
    if (currentUser.role === "Admin" || currentUser.id === user.id) {
      setEditingUser(user);
      setOpenModal(true);
    } else {
      toast.error("Vous ne pouvez modifier que vos propres informations");
    }
  };

  return (
    <div className={`w-full flex flex-col gap-8`}>
      <ToastContainer position="top-right" autoClose={5000} />

      {/* TITLE + BUTTON */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>

        <button
          onClick={() => {
            setEditingUser(null);
            setOpenModal(true);
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium flex items-center gap-2"
        >
          <span className="text-xl">＋</span> Ajouter un utilisateur
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm font-semibold border-b">
              <th className="py-3 text-left">NOM</th>
              <th className="py-3 text-left">TÉL</th>
              <th className="py-3 text-left">RÔLE</th>
              <th className="py-3 text-left">EMAIL</th>
              <th className="py-3 text-left">DERNIÈRE CONNEXION</th>
              <th className="py-3 text-left">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 font-medium">{u.nom} {u.prenom}</td>
                <td className="text-gray-700">{u.contact}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-sm ${u.role === "Admin" ? "bg-green-200 text-green-700" : "bg-blue-200 text-blue-700"}`}>
                    {u.role}
                  </span>
                </td>
                <td className="text-gray-700">{u.email}</td>
                <td className="text-gray-700"> _ </td>
                <td>
                  <div className="flex gap-4">
                    {(currentUser.role === "Admin" || currentUser.id === u.id) && (
                      <EditIcon
                        className="text-green-600 cursor-pointer"
                        onClick={() => handleEditUser(u)}
                      />
                    )}

                    {currentUser.role === "Admin" && currentUser.id !== u.id && (
                      <DeleteIcon
                        className="text-red-600 cursor-pointer"
                        onClick={() => handleDeleteUser(u)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <span className="cursor-pointer" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
          {"<"}
        </span>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              currentPage === i + 1 ? "bg-green-600 text-white" : "bg-white border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <span className="cursor-pointer" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}>
          {">"}
        </span>
      </div>

      {/* MODAL */}
      {openModal && (
        <AddUserModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleAddUser}
          editingUser={editingUser}
        />
      )}
    </div>
  );
}
