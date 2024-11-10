// src/Components/Card.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../Assets/css/Card.css'; // Adjust the path if necessary

const Card = ({ name, category, image, description }) => (
  <div className="card">
    <div className="card-image-container">
      <img src={image} alt={name} className="card-image" />
    </div>
    <h3>{name}</h3>
    <p className="category">{category}</p>
    <p className="description">{description}</p> 
    <Link to="/appointment" className="book-button">
      Book Appointment
    </Link>
  </div>
);

export default Card;
