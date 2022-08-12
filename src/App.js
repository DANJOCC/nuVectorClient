import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="bg-fullscreen">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
