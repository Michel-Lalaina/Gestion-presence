import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UsersManagement() {
  const users = [
    {
      name: "Michel Lalaina",
      role: "Admin",
      email: "michelramanantenasoa@gmail.com",
      lastLogin: "15/10/2023 à 14h30",
      roleColor: "bg-green-200 text-green-700",
    },
    {
      name: "Aro mampianina",
      role: "Enseignant",
      email: "aroniaina@gmail.com",
      lastLogin: "14/10/2023 à 09h15",
      roleColor: "bg-blue-200 text-blue-700",
    },
    {
      name: "Carole",
      role: "Enseignant",
      email: "carolrina@gmail.com",
      lastLogin: "Hier à 11h00",
      roleColor: "bg-blue-200 text-blue-700",
    },
    {
      name: "Synand Mario",
      role: "Enseignant",
      email: "synand35@gmail.com",
      lastLogin: "Aujourd'hui à 08h45",
      roleColor: "bg-blue-200 text-blue-700",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-8">

      {/* TITLE + BUTTON */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>

        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-medium flex items-center gap-2">
          <span className="text-xl">＋</span> Ajouter un utilisateur
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-gray-500 text-sm font-semibold border-b">
              <th className="py-3 text-left">NOM</th>
              <th className="py-3 text-left">RÔLE</th>
              <th className="py-3 text-left">EMAIL</th>
              <th className="py-3 text-left">DERNIÈRE CONNEXION</th>
              <th className="py-3 text-left">ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-4 font-medium">{u.name}</td>

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
                      className="text-green-600 cursor-pointer hover:scale-110 transition"
                    />
                    <DeleteIcon
                      className="text-red-600 cursor-pointer hover:scale-110 transition"
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
        <span className="cursor-pointer">{"<"}</span>

        {[1, 2, 3, 4].map((p) => (
          <button
            key={p}
            className={`w-10 h-10 rounded-full flex items-center justify-center 
            ${p === 1 ? "bg-green-600 text-white" : "bg-white border"}`}
          >
            {p}
          </button>
        ))}

        <span className="cursor-pointer">{">"}</span>
      </div>
    </div>
  );
}
