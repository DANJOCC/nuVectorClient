import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Workspace from "./pages/Workspace";
import { useSelector,useDispatch } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CreateProject from "./pages/CreateProject";
import Project from "./pages/Project";
import { useEffect } from "react";
import { getStorageData } from "./features/authSlice";

function App() {
  const {user,token}=useSelector(state=>state.auth)
  const dispatch=useDispatch() 

  //font

  /*after login recover user data from session storage*/

  useEffect(()=>{
    dispatch(getStorageData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="bg-fullscreen">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route element={<ProtectedRoutes isAllowed={user.logged}/>}>
            <Route path="/workspace" element={<Workspace role={user.role} token={token} id={user.id}/>}></Route>
            <Route path="/project/:id" element={<Project/>}></Route>
        </Route>
        <Route  element={<ProtectedRoutes isAllowed={user.logged && user.role==='ADMIN'}/>}>
          <Route path="/NewProject" element={<CreateProject token={token}/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
