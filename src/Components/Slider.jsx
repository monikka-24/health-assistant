import React from 'react';
import PropTypes from 'prop-types';
import '../Assets/css/slider.css';

const Slider = ({ label, min, max, value, color, options, onChange }) => {

  const getBackgroundColor = () => {
    if (options) {
      switch (options[value]) {
        case 'MILD':
          return 'yellow';
        case 'MODERATE':
          return 'orange';
        case 'SEVERE':
          return 'red';
        default:
          return '#ddd';
      }
    }
    return color || '#ddd';
  };

  return (
    <div className="slider-wrapper">
      <label className="slider-label">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className={`slider ${color ? color : ''}`}
        onChange={(e) => onChange(parseInt(e.target.value))}
        style={{
          background: `linear-gradient(to right, ${getBackgroundColor()} ${((value - min) * 100 / (max - min))}%, #ddd 0%)`
        }}
      />
      {label.includes('Hours slept last night:') && <span className="slider-value">{value}</span>}
      {options && (
        <div className="slider-options">
          {options.map((option, index) => (
            <span
              key={index}
              className={`option ${index === value ? 'selected' : ''}`}
              style={{
                color: index === value ? 'black' : 'lightgrey',
                fontWeight: index === value ? 'bold' : 'normal'
              }}
            >
              {option}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default Slider;
