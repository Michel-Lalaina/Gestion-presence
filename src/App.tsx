import { Routes, Route } from "react-router-dom";
import StudentCardsPage from "./page/Presence";
import PresenceList from "./page/PresenceList";
import MainLayout from "./layouts/mainLayout";
import Dashboard from "./page/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/presences" element={<PresenceList />} />
        <Route path="/etudiants" element={<StudentCardsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
