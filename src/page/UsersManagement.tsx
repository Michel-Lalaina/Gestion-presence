import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserModal from "../components/AddUserModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  firstname: string;
  lastname: string;
  tel: string;
  role: string;
  email: string;
  lastLogin: string;
  roleColor: string;
}

type NewUser = {
  firstname: string;
  lastname: string;
  tel: string;
  role: string;
  email: string;
};

const USERS_PER_PAGE = 2;

export default function UsersManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      firstname: "Michel",
      lastname: "Lalaina",
      tel: "00000000",
      role: "Admin",
      email: "michelramanantenasoa@gmail.com",
      lastLogin: "15/10/2023 à 14h30",
      roleColor: "bg-green-200 text-green-700",
    },
    {
      firstname: "Aro",
      lastname: "Mampianina",
      tel: "00000000",
      role: "Enseignant",
      email: "aroniaina@gmail.com",
      lastLogin: "14/10/2023 à 09h15",
      roleColor: "bg-blue-200 text-blue-700",
    },
    {
      firstname: "Carole",
      lastname: "",
      tel: "00000000",
      role: "Enseignant",
      email: "carolrina@gmail.com",
      lastLogin: "Hier à 11h00",
      roleColor: "bg-blue-200 text-blue-700",
    },
    {
      firstname: "Synand",
      lastname: "Mario",
      tel: "00000000",
      role: "Enseignant",
      email: "synand35@gmail.com",
      lastLogin: "Aujourd'hui à 08h45",
      roleColor: "bg-blue-200 text-blue-700",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const totalPages = Math.ceil(users.length / USERS_PER_PAGE);

  const paginatedUsers = users.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  const handleFunction = () => {
    toast.error("Seule l'administrateur à cette fonctionnalité!");
  };

  const handleAddUser = (user: NewUser) => {
    const completedUser: User = {
      ...user,
      lastLogin: "À l’instant",
      roleColor:
        user.role === "Admin"
          ? "bg-green-200 text-green-700"
          : "bg-blue-200 text-blue-700",
    };

    setUsers((prev) => [...prev, completedUser]);
    setOpenModal(false);
    setCurrentPage(Math.ceil((users.length + 1) / USERS_PER_PAGE));
  };

  return (
    <div className={`w-full flex flex-col gap-8`}>
      {/* TITLE + BUTTON */}
      <div className="flex items-center justify-between">
        <ToastContainer position="top-right" autoClose={5000} />
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>

        <button
          onClick={() => setOpenModal(true)}
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
            {paginatedUsers.map((u, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 font-medium">
                  {u.firstname} {u.lastname}
                </td>

                <td className="text-gray-700">{u.tel}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${u.roleColor}`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="text-gray-700">{u.email}</td>
                <td className="text-gray-700">{u.lastLogin}</td>

                <td>
                  <div className="flex gap-4">
                    <EditIcon
                      className="text-green-600 cursor-pointer"
                      onClick={handleFunction}
                    />
                    <DeleteIcon
                      className="text-red-600 cursor-pointer"
                      onClick={handleFunction}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <span
          className="cursor-pointer"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          {"<"}
        </span>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full flex items-center justify-center 
            ${
              currentPage === i + 1
                ? "bg-green-600 text-white"
                : "bg-white border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <span
          className="cursor-pointer"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        >
          {">"}
        </span>
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
