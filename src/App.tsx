// import { Routes, Route } from "react-router-dom";
// import StudentCardsPage from "./page/Presence";
// import PresenceList from "./page/PresenceList";
// import MainLayout from "./layouts/mainLayout";
// import Dashboard from "./page/Dashboard";
// import Settings from "./page/Settings";
// import UsersManagement from "./page/UsersManagement";

// function App() {
//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/presences" element={<PresenceList />} />
//         <Route path="/etudiants" element={<StudentCardsPage />} />
//         <Route path="/parametres" element={<Settings/>} />
//         <Route path="/utilisateurs" element={<UsersManagement/>} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { Routes, Route, Navigate } from "react-router-dom";
import StudentCardsPage from "./page/EleveList";
import PresenceList from "./page/PresenceList";
import MainLayout from "./layouts/mainLayout";
import Dashboard from "./page/Dashboard";
import Settings from "./page/Settings";
import UsersManagement from "./page/UsersManagement";
import Login from "./page/Login";

function App() {
  return (
    <Routes>
      {/* Page login */}
      <Route path="/login" element={<Login />} />

      {/* Toutes les autres pages passent par MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/presences" element={<PresenceList />} />
        <Route path="/etudiants" element={<StudentCardsPage />} />
        <Route path="/parametres" element={<Settings />} />
        <Route path="/utilisateurs" element={<UsersManagement />} />
      </Route>

      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;



