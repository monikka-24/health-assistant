import React, { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../Assets/css/nav.css';
import Modal from './Modal';
import Login from './Login';
import Signup from './Signup';
import profile from '../Assets/profile.webp';
import logo from '../Assets/logo.png';


function Layout({setName,name,setTrigger,role, handleSignOut,dropdownOpen,setDropdownOpen}) {
    const [activePage, setActivePage] = useState('Home');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
  
  

    // const storedName = localStorage.getItem('detail');
    //     return storedName ? JSON.parse(storedName) : '';
  
  
    const [appointmentDropdownOpen, setAppointmentDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);
  

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const switchToLogin = () => setIsLogin(true);
    const switchToSignup = () => setIsLogin(false);

    const handlePageClick = (page) => {
        setActivePage(page);
        setAppointmentDropdownOpen(false);
    };

    const handleLogin = (name) => {
        setName(name);
        localStorage.setItem('detail', JSON.stringify(name));
        closeModal();
    };

   

    return (
        <div>
            <div className="nav-bar">
                <div className="logo">
                    <img className="logo-icon" src={logo} alt="Logo" />
                </div>
                <div className="page-names">
                    <Link to="/" className={activePage === 'Home' ? 'active' : ''} onClick={() => handlePageClick('Home')}>Home</Link>
                    <Link to="/my-progress" className={activePage === 'My Progress' ? 'active' : ''} onClick={() => handlePageClick('My Progress')}>Program</Link>
                    <div className="dropdown" onMouseEnter={() => setAppointmentDropdownOpen(true)} onMouseLeave={() => setAppointmentDropdownOpen(false)}>
                        <Link to="/appointment" className={`dropbtn ${activePage === 'Doctor' || activePage === 'Trainer' ? 'active' : ''}`} onClick={() => handlePageClick('Appointment')}>Appointment</Link>
                        {appointmentDropdownOpen && (
                            <div className="dropdown-content">
                                <Link to="/appointment/doctor" className={activePage === 'Doctor' ? 'active' : ''} onClick={() => handlePageClick('Doctor')}>Doctor</Link>
                                <Link to="/appointment/trainer" className={activePage === 'Trainer' ? 'active' : ''} onClick={() => handlePageClick('Trainer')}>Trainer</Link>
                            </div>
                        )}
                    </div>
                    <Link to="/diet-plan" className={activePage === 'Diet Plan' ? 'active' : ''} onClick={() => handlePageClick('Diet Plan')}>Diet Plan</Link>
                </div>
                <div className="log">
                    {name ? (
                        <div className="after-login" onClick={() => setDropdownOpen(!dropdownOpen)} ref={profileRef}>
                            {role?.replace(/"/g, '') === "USER"?<Link to='/profile'> <img className="after-profile" src={profile} alt="Profile" /></Link>:
                            role?.replace(/"/g, '') === "DOCTOR"?<Link to='/doctorprofile'> <img className="after-profile" src={profile} alt="Profile" /></Link>:
                            <Link to='/trainerprofile'> <img className="after-profile" src={profile} alt="Profile" /></Link>
                            }
                           
                            <p className="after-name">{name?.replace(/"/g, '')}</p>
                            {dropdownOpen && (
                                <div className="dropdown-menu" ref={dropdownRef}>
                                    <button onClick={handleSignOut}>Sign Out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button onClick={() => { openModal(); switchToLogin(); }}>Log in</button>
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {isLogin ? (
                    <Login switchToSignup={switchToSignup} onClose={closeModal} onLogin={handleLogin} setTrigger={setTrigger} />
                ) : (
                    <Signup switchToLogin={switchToLogin} onClose={closeModal} />
                )}
            </Modal>
            <Outlet />
        </div>
    );
}

export default Layout;
