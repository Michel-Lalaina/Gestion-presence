
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentCardsPage from "./page/Presence";
 import PresenceList from "./page/PresenceList";
import MainLayout from "./layouts/mainLayout";

function App() {

  return (


    <BrowserRouter>
      <Routes>

        {/* layout global */}
        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/presences" element={<PresenceList/>} />
          <Route path="/etudiants" element={<StudentCardsPage/>} />
          <Route path="/cours" element={<Cours />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
    export default App