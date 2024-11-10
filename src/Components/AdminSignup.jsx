import React, { useState } from 'react';
import axios from 'axios';
import '../Assets/css/Signup.css';
import fit from "../Assets/dlogin.jpg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminSignup({ onClose, switchToDLogin }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) {
      newErrors.name = "Username is required.";
    }
    if (!email) {
      newErrors.email = "Email is required.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8080/api/doctor/signup', {
          name: name,
          email: email,
          password: password,
        });
        toast.success('Successfully registered', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
        setTimeout(() => {
          navigate('/dl');
        }, 3000);
        console.log('User signed up:', response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error signing up:', error.response ? error.response.data : error.message);
        setErrors({ auth: 'Failed to sign up. Please try again.' });
        setLoading(false);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="signup">
          <form onSubmit={handleSubmit}>
            <p className="create">CREATE YOUR ACCOUNT</p>
            <input 
              type="text" 
              value={name} 
              onChange={handleNameChange} 
              placeholder="Username" 
            />
            {errors.name && <span className="error">{errors.name}</span>}
            <input 
              type="email" 
              value={email} 
              onChange={handleEmailChange} 
              placeholder="Email" 
            />
            {errors.email && <span className="error">{errors.email}</span>}
            <input 
              type={showPassword ? "text" : "password"} 
              value={password} 
              onChange={handlePasswordChange} 
              placeholder="Password" 
            />
            {errors.password && <span className="error">{errors.password}</span>}
            {errors.auth && <span className="error">{errors.auth}</span>}
            <div className="form-options-sign">
              <div>
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                />
              </div>
              <div>
                <label>Show Password</label>
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <p className="login-link" onClick={() => navigate('/al')}>
              Already have an account? Login
            </p>
          </form>
        </div>
        <div className="Spic">
          <img src={fit} alt="Fit" />
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}