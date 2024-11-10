import React, { useState, useRef, useEffect } from 'react';
import '../Assets/css/nav.css';
import '../Assets/css/mentalcare.css';
import Modal from './Modal';
import Login from './Login';
import Signup from './Signup';
import Mood from './Mood';


export default function Mentalcare() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('Mental Care');

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const switchToLogin = () => setIsLogin(true);
  const switchToSignup = () => setIsLogin(false);

  const handleLogin = (name) => {
    setName(name);
    closeModal();
  };

  const handleSignOut = () => {
    setName('');
    setDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      profileRef.current &&
      !profileRef.current.contains(event.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePageClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="mentalcare-container">
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLogin ? (
          <Login switchToSignup={switchToSignup} onClose={closeModal} onLogin={handleLogin} />
        ) : (
          <Signup switchToLogin={switchToLogin} onClose={closeModal} />
        )}
      </Modal>
      <div className="mentalcare-page">
        <h1 style={{textAlign:'center'}}>How are you feeling today?</h1>
        <Mood/>
      </div>
    </div>
  );
}
