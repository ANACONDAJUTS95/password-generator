import './PasswordGenerator.css';
import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasCapitalLetter: false,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Check password requirements
    setRequirements({
      minLength: value.length >= 8 && value.length <= 20,
      hasNumber: /\d/.test(value),
      hasSpecialChar: /[~`!@#$%^&*()\-_+=|\\/{}[\];:"'<,>.?]/.test(value),
      hasCapitalLetter: /[A-Z]/.test(value),
    });
  };

  const strengthLevel = () => {
    const passedRequirements = Object.values(requirements).filter(Boolean).length;

    if (passedRequirements <= 1) return 'Low';
    if (passedRequirements === 2 || passedRequirements === 3) return 'Medium';
    return 'High';
  };

  const progressBarClass = () => {
    const level = strengthLevel();
    if (level === 'Low') return 'low';
    if (level === 'Medium') return 'medium';
    return 'high';
  };

  return (
    <div className="password-generator-container">
      <div className="password-generator-inner">
        <h2>Password Generator</h2>
        
        <input
          type="text"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Type your password"
          className="password-input"
        />

        <div className="requirements">
          <label>
            <input type="checkbox" checked={requirements.minLength} readOnly />
            Minimum 8 characters and Maximum 20
          </label>
          <label>
            <input type="checkbox" checked={requirements.hasNumber} readOnly />
            Contains a number
          </label>
          <label>
            <input type="checkbox" checked={requirements.hasSpecialChar} readOnly />
            Contains a special character
          </label>
          <label>
            <input type="checkbox" checked={requirements.hasCapitalLetter} readOnly />
            Contains a capital letter
          </label>
        </div>

        <div className="progress-bar-container">
          <div 
            className={`progress-bar ${progressBarClass()}`}
            style={{ width: `${Object.values(requirements).filter(Boolean).length * 25}%` }}
          />
        </div>
        <p className="password-strength-text">Password Strength: {strengthLevel()}</p>
      </div>
    </div>
  );
};

export default PasswordGenerator;
