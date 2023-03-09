import { Route, Routes } from "react-router-dom"
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import Unathorized from "./components/Unathorized";
import RequireAuth from "./components/RequireAuth";


function App() {
  return (
    <Routes>
       <Route path='/' element = {<Layout />} >
          {/* public routes */}
         <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unathorized />} />
        
          {/* protected routes */}
        
         <Route element={<RequireAuth allowedRoles='user'/> } >
             <Route path="/" element={<Home />} />
         </Route>

         <Route element={<RequireAuth allowedRoles='editor'/> } >
              <Route path="editor" element={<Editor />} />
         </Route>

         <Route element={<RequireAuth allowedRoles='admin'/> } >
               <Route path="admin" element={<Admin />} />
         </Route>

         <Route element={<RequireAuth allowedRoles='logger'/> } >
                 <Route path="lounge" element={<Lounge/>} />  
         </Route> 
        </Route>

        {/* catch all routes */}
        <Route path='*' element = {<Missing />} />
     
    </Routes>


  )
}

export default App
