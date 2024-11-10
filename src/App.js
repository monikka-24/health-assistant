import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Diet from './Components/Diet';
import Mentalcare from './Components/mentalcare';
import Trainers from './Components/Trainers';
import Layout from './Components/Layout';
import Program from './Components/Program';
import Bulking from './Components/Bulking';
import Appointment from './Components/Appointment';
import WeightLoss from './Components/WeightLoss';
import DoctorLogin from './Components/DoctorLogin';
import Profile from './Components/Profile';
import TrainerLogin from './Components/TrainerLogin';
import DoctorSignup from './Components/DoctorSignup';
import TrainerSignup from './Components/TrainerSignup';
import AdminLogin from './Components/AdminLogin';
import AdminSignup from './Components/AdminSignup';
import DoctorProfile from './Components/DoctorProfile';
import TrainerProfile from './Components/TrainerProfile';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    setName('');
    localStorage.removeItem('detail');
    localStorage.clear();
    navigate("/");
    setDropdownOpen(false);
  };

  useEffect(() => {
    setName(localStorage.getItem('detail'));
    setRole(localStorage.getItem('role'));
  }, [trigger]);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  return (
    <Routes>
      <Route path="/" element={<Layout setDropdownOpen={setDropdownOpen} handleSignOut={handleSignOut} dropdownOpen={dropdownOpen} role={role} setName={setName} name={name} setTrigger={setTrigger} />} >
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login setTrigger={setTrigger} setName={setName} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dl" element={<DoctorLogin setTrigger={setTrigger} setName={setName} />} />
        <Route path="/tl" element={<TrainerLogin setTrigger={setTrigger} setName={setName} />} />
        {/* <Route path="/al" element={<AdminLogin setTrigger={setTrigger} setName={setName} />} /> */}
        <Route path="/ds" element={<DoctorSignup />} />
        <Route path="/ts" element={<TrainerSignup />} />
        {/* <Route path="/as" element={<AdminSignup />} /> */}
        <Route path="/appointment/doctor" element={<Trainers />} />
        {/* <Route path="/mental-care" element={<Mentalcare />} /> */}
        <Route path="/diet-plan" element={<Diet />} />
        <Route path="/my-progress" element={<Program />} />
        <Route path="/bulking" element={<Bulking />} />
        <Route path="/weightloss" element={<WeightLoss />} />
        <Route path="/appointment/trainer" element={<Trainers />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/profile" element={<Profile handleSignOut={handleSignOut} setName={setName} setTrigger={setTrigger} />} />
        <Route path="/doctorprofile" element={<DoctorProfile handleSignOut={handleSignOut} setName={setName} setTrigger={setTrigger} />} />
        <Route path="/trainerprofile" element={<TrainerProfile handleSignOut={handleSignOut} setName={setName} setTrigger={setTrigger} />} />
      </Route>
    </Routes>
  );
}

export default App
