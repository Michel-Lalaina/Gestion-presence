
import Profile from './home';
import { Routes, Route } from "react-router-dom";


function App() {

  return (
  
      <Routes>
        <Route path="/" element={<Profile/>}>
        </Route>
      </Routes>

  );
}

export default App;