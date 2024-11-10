import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Assets/css/program.css';

const Program = () => {
    const [activePage, setActivePage] = useState('Workouts');
    const [name, setName] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);


    const handlePageClick = (page) => {
        setActivePage(page);
      };
  return (

    <div className="programs-container">
      <div className="program-card">
        <h3>Bulking</h3>
        <p>Our bulking program is tailored to help you gain muscle mass through
        structured workout routines and a high-calorie diet plan.</p>
        <Link to="/bulking">Click here</Link>
      </div>
      <div className="program-card">
        <h3>Weight Loss</h3>
        <p> Our weight loss program is designed to help you shed those extra pounds
        through a combination of diet, exercise, and lifestyle changes.</p>
        <Link to="/weightloss">Click here</Link>
      </div>
    </div>
  );
}

export default Program;