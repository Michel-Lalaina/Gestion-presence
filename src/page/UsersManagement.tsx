// src/page/UsersManagement.tsx

import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserModal from "../components/AddUserModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getListUsers, createUser } from "../services/User";

interface User {
  id: number;
  noms: string;
  tel: string;
  role: string;
  email: string;
  last_login?: string;
}

const USERS_PER_PAGE = 5;

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  /** 🔄 Chargement backend */
  const fetchUsers = async () => {
    try {
      const data = await getListUsers();
      setUsers(data);
    } catch {
      toast.error("Erreur lors du chargement des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /** ➕ Ajout utilisateur */
  const handleAddUser = async (user: {
    noms: string;
    tel: string;
    role: string;
    email: string;
  }) => {
    try {
      await createUser(user);
      toast.success("Utilisateur ajouté avec succès");
      setOpenModal(false);
      fetchUsers();
    } catch {
      toast.error("Erreur lors de la création");
    }
  };

  const handleForbidden = () => {
    toast.error("Seul l’administrateur peut effectuer cette action");
  };

  if (loading) {
    return <div className="text-center text-xl">Chargement...</div>;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <ToastContainer />

      {/* TITLE */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium"
        >
          ＋ Ajouter un utilisateur
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm font-semibold border-b">
              <th>NOM</th>
              <th>TÉL</th>
              <th>RÔLE</th>
              <th>EMAIL</th>
              <th>DERNIÈRE CONNEXION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="py-4 font-medium">{u.noms}</td>
                <td>{u.tel}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      u.role === "Admin"
                        ? "bg-green-200 text-green-700"
                        : "bg-blue-200 text-blue-700"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td>{u.email}</td>
                <td>{u.last_login ?? "-"}</td>

                <td>
                  <div className="flex gap-4">
                    <EditIcon
                      className="text-green-600 cursor-pointer"
                      onClick={handleForbidden}
                    />
                    <DeleteIcon
                      className="text-red-600 cursor-pointer"
                      onClick={handleForbidden}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-3">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-9 h-9 rounded-full ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "border"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* MODALE */}
      <AddUserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleAddUser}
      />
    </div>
  );
}
