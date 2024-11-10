import React, { useState, useRef, useEffect } from 'react';
import Bmi from '../Components/Bmi';
import '../Assets/css/Home.css';
import Modal from './Modal';
import Login from './Login';
import Signup from './Signup';
import balance from '../Assets/balance.webp';
import healthy from '../Assets/healthy.webp';
import blog1 from '../Assets/blog1.jpeg';
import blog2 from '../Assets/blog2.webp';
import location from '../Assets/location.png';
import contact from '../Assets/contact.jpg';
import email from '../Assets/email.png';
import '../Assets/css/footer.css';
import '../Assets/css/nav.css';
import facebook from '../Assets/facebook.png';
import twitter from '../Assets/twitter.png';
import insta from '../Assets/insta.png';
import NewsletterForm from './newsletter';
import { Link } from 'react-router-dom';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('Home'); // State for active page

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
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isLogin ? (
          <Login switchToSignup={switchToSignup} onClose={closeModal} onLogin={handleLogin} />
        ) : (
          <Signup switchToLogin={switchToLogin} onClose={closeModal} />
        )}
      </Modal>
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${"https://img.freepik.com/premium-photo/solitary-red-capsule-stands-amidst-collection-green-ones-signals-distinct-presence_733217-2190.jpg"})`}}>
        <div className="hero-content">
          <h1><span className="freak">Hearty </span><span >Happiness</span></h1>
          <p>Personalized Care, Perfect Health</p>
          <p>Get your plan to get the latest scoop right to your inbox</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Get Started</button>
          </form>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h2>Welcome To Hearty Happiness</h2>
          <p>Don’t limit your challenges. Challenge your limits</p>
          <div className="services">
            <div className="service">
              <img src={healthy} alt="Icon 2" />
              <h3>Healthy Daily Life</h3>
              <p>Prioritize healthy choices in diet, activity, and rest for overall wellness.</p>
            </div>
            <div className="service">
              <img src={balance} alt="Icon 3" />
              <h3>Balance Body & Mind</h3>
              <p>Balance nutritious eating, regular exercise, and restful sleep for optimal health</p>
            </div>
          </div>
        </div>
      </section>

      <Bmi />
      <NewsletterForm />
      <footer className="footer">
        <div className="footer-section about-us">
          <h3>About Us</h3>
          <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
          <div className="social-icons">
            <img style={{ height: '45px' }} src={facebook} alt='facebook'></img>
            <img style={{ height: '42px' }} src={twitter} alt='twitter'></img>
            <img style={{ height: '45px', borderRadius: '22px' }} src={insta} alt='insta'></img>
          </div>
        </div>
        <div className="footer-section recent-blog">
          <h3>Recent Blog</h3>
          <div className="blog-post">
            <img src={blog1} alt="Blog post" />
            <p>Even the all-powerful Pointing has no control about<br />Jul 22, 2024</p>
          </div>
          <div className="blog-post">
            <img src={blog2} alt="Blog post" />
            <p>Even the all-powerful Pointing has no control about<br />Dec 25, 2023</p>
          </div>
        </div>
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <ul>
            <li><img style={{width: '30px',marginRight:'20px'}} src={location} alt='location' /> Coimbatore</li>
            <li><img style={{width: '40px',marginRight:'12px'}} src={contact} alt='contact' /> +91 9585 6604 441</li>
            <li><img style={{width: '27px',marginRight:'22px',marginLeft:'5px'}} src={email} alt='email' /> heartyhappiness@gmail.com</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
