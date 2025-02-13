
import Profile from './home';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
