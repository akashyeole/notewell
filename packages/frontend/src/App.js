import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import {Home, About, User, UpdateProfile, Feedback, Help} from "./Pages"
import { useEffect } from 'react';
import ApplicationState from './Context/application/ApplicationState';
import AuthState from './Context/authentication/AuthState';
import Layout from './Layout';
import ProtectedRoute from './Pages/ProtectedRoute';

function App() {  

  return (
    <>
      <ApplicationState>
        <AuthState>
          <Router>
            <Navbar />
            <Routes>

              <Route path="/" element={<Layout/>}>
                {/* Public Routes */}
                <Route path="/" element={<Home/>}/>
                <Route path="about" element = {<About/>}/>
                <Route path="user" element = {<User/>} />
                <Route path="feedback" element = {<Feedback/>}/>

                {/*Private Routes */}
                <Route element={<ProtectedRoute/>}>
                  <Route path="help" element = {<Help/>} />
                  <Route path="/updateprofile" element = {<UpdateProfile/>}/>
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthState>
      </ApplicationState>
    </>
  );
}

export default App;
