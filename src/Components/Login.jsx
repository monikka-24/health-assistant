import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Assets/css/Login.css";
import fit from "../Assets/login.png";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ switchToSignup, onClose ,setTrigger,setName}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form is valid, attempting to log in...");
      try {
        const response = await axios.post("http://localhost:8080/api/users/login", formData);
        console.log("User logged in:", response.status);
        if (response.status === 200) {
          localStorage.setItem('detail', JSON.stringify(response.data.name))
         
        
          console.log("Navigating to home page...");
          localStorage.setItem('detail', JSON.stringify(response.data.name))
          localStorage.setItem('role', JSON.stringify(response.data.role))
          localStorage.setItem('id', JSON.stringify(response.data.id))
          setTrigger(true)
          // setName(response.data.name)
          console.log(response.data)
          toast.success('Successfully logged in', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setTimeout(onClose,3000)
        } else {
          console.error("Unexpected response status:", response.status);
          setErrors({ auth: 'Failed to login. Please check your credentials.' });
        }
      } catch (error) {
        console.error("There was an error logging in:", error);
        setErrors({ auth: 'Failed to login. Please check your credentials.' });
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="container">
          <div className="login">
            <form onSubmit={handleSubmit}>
              <p className="welcome">WELCOME BACK!</p>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {errors.password && <span className="error">{errors.password}</span>}
              {errors.auth && <span className="error">{errors.auth}</span>}
              <div className="form-options">
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
              <button type="submit">Login</button>
              <p className="forget">Forgot Password?</p>
              <p className="no-account" onClick={switchToSignup}>
                Don't have an account? Sign Up
              </p>
              <Link to='/dl'><p className="no-account" onClick={onClose} >
                Are you Doctor? Login
              </p></Link>
              <Link to='/tl'><p className="no-account" onClick={onClose}>
                Are you Trainer? Login
              </p></Link>
            </form>
            <div className="pic">
              <img src={fit} alt="Fit" />
            </div>
          </div>
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
      <ToastContainer />
    </div>
  );
}
