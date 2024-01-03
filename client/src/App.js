import React from "react";
import { AuthContextProvider } from "./Context/AuthContext";
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Signin from "./Signin";
import Login from "./Login";
import Home from "./Home";
import Likes from "./Likes";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/LogIn" element={<Login/>}/>
        <Route path="/Home" element={<Signin/>}/>
        <Route path="/Likes" element={<Likes/>}/>
        {/* <Route path="/Plans" element={<Plans/>}/> */}
      </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
    
  );
}

export default App;
