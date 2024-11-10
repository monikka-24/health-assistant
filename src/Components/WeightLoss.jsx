import React from 'react';
import '../Assets/css/Bulking.css';

const workoutPlan = [
  {
    day: 'Monday',
    exercises: [
      { name: 'chest + cardio', image: 'https://i.pinimg.com/originals/6b/89/10/6b891066ff99cde675388c360320a68a.gif' },
    ],
  },
  {
    day: 'Tuesday',
    exercises: [
      { name: 'back', image: 'https://i.pinimg.com/originals/b8/ce/b4/b8ceb49367a623a328181c679f41f9a8.gif' },
    ],
  },
  {
    day: 'Wednesday',
    exercises: [
      { name: 'biceps + cardio', image: 'https://i.pinimg.com/originals/af/4c/81/af4c81cbb8f132a97b4bd344ffaae9db.gif' },
    ],
  },
  {
    day: 'Thursday',
    exercises: [
      { name: 'triceps', image: 'https://i.pinimg.com/originals/57/0d/3a/570d3a748fd166ae037ed47f09179a7c.gif' },
    ],
  },
  {
    day: 'Friday',
    exercises: [
      { name: 'shoulder + cardio', image: 'https://i.pinimg.com/originals/0b/c4/88/0bc488e5e2dfb4caf66ba6468a5e0f7d.gif' },
    ],
  },
  {
    day: 'Saturday',
    exercises: [
      { name: 'legs', image: 'https://i.pinimg.com/originals/7d/63/6e/7d636ef0ec671de223f2e815d973597e.gif' },
    ],
  },
  {
    day: 'Sunday',
    exercises: [
      { name: 'Active rest day', image: 'https://i.pinimg.com/564x/5d/67/89/5d6789efa8ac430e29b6d481a3dafdd9.jpg' },
    ],
  },
];

const WeightLoss = () => {
  return (
    <div className="bulking" style={{ marginTop: "72px" }}>
      <h1>WeightLoss</h1>
      <br />
      <h2>Workout Plans</h2>
      <br />
      <div className="plans-container">
        {workoutPlan.map((dayPlan) => (
          <div key={dayPlan.day} className="day-plan">
            <h2>{dayPlan.day}</h2>
            <div className="exercises">
              {dayPlan.exercises.map((exercise) => (
                <div key={exercise.name} className="exercise-card">
                  <img src={exercise.image} alt={exercise.name} />
                  <p>{exercise.name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeightLoss;