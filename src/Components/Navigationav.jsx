import React from 'react'
import logo from '../Assets/logo.png';
export default function nav() {
  return (
    <div>
      <div className="nav-bar">
        <div className="logo">
          <img className="logo-icon" src={logo} alt="Logo" />
        </div>
        <div className="page-names">
          <p>Home</p>
          <p>Hiring</p>
          <p>Mental Care</p>
          <p>Diet Plan</p>
          <p>Program</p>
        </div>
        <div className="log">
          <button onClick={() => { openModal(); switchToLogin(); }}>Log in</button>
        </div>
      </div>
    </div>
  )
}
