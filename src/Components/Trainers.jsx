import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Assets/css/Trainers.css';
import Card from '../Components/Card';
import doctor1Img from '../Assets/doctor1Img.jpg';
import doctor2Img from '../Assets/doctor2Img.jpg';
import doctor3Img from '../Assets/doctor3Img.jpg';
import doctor4Img from '../Assets/doctor4Img.jpg';
import doctor5Img from '../Assets/doctor5Img.jpg';
import doctor6Img from '../Assets/doctor6Img.jpg';
import trainer1Img from '../Assets/trainer1Img.jpg';
import trainer2Img from '../Assets/trainer2Img.jpg';
import trainer3Img from '../Assets/trainer3Img.jpg';
import trainer4Img from '../Assets/trainer4Img.jpg';
import trainer5Img from '../Assets/trainer5Img.jpg';
import trainer6Img from '../Assets/trainer6Img.jpg';

function Trainers() {
    const location = useLocation();
    const isDoctorRoute = location.pathname.includes('doctor');
    const isTrainerRoute = location.pathname.includes('trainer');

    // Define items with unique images and descriptions for doctors and trainers
    const items = [
        { name: 'Dr. John Doe', category: 'Doctor', image: doctor1Img, description: 'Specialist in Cardiology' },
        { name: 'Dr. Jane Smith', category: 'Doctor', image: doctor2Img, description: 'Expert in Neurology' },
        { name: 'Dr. Sam Brown', category: 'Doctor', image: doctor3Img, description: 'Orthopedic Surgeon' },
        { name: 'Dr. Lisa White', category: 'Doctor', image: doctor4Img, description: 'General Practitioner' },
        { name: 'Dr. Emily Johnson', category: 'Doctor', image: doctor5Img, description: 'Dermatologist' },
        { name: 'Dr. Michael Lee', category: 'Doctor', image: doctor6Img, description: 'Pediatrician' },
        { name: 'Jane Doe', category: 'Trainer', image: trainer1Img, description: 'Certified Fitness Trainer' },
        { name: 'John Smith', category: 'Trainer', image: trainer2Img, description: 'Expert in Weight Training' },
        { name: 'Mark Brown', category: 'Trainer', image: trainer3Img, description: 'Yoga Instructor' },
        { name: 'Sara White', category: 'Trainer', image: trainer4Img, description: 'Cardio Specialist' },
        { name: 'Anna Johnson', category: 'Trainer', image: trainer5Img, description: 'Personal Trainer' },
        { name: 'Tom Lee', category: 'Trainer', image: trainer6Img, description: 'Strength Coach' }
    ];

    const filteredItems = items.filter(item =>
        (isDoctorRoute && item.category === 'Doctor') ||
        (isTrainerRoute && item.category === 'Trainer')
    );

    return (
        <div style={{ marginTop: "72px" }}>
            <div className="results-container">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                        <Card
                            key={index}
                            name={item.name}
                            category={item.category}
                            image={item.image}
                            description={item.description} // Pass description
                        />
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    )
}

export default Trainers;
