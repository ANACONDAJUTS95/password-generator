import './PasswordGenerator.css';
import React, { useState } from 'react';

const PasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasCapitalLetter: false,
    noRepeatLetters: true,
    noSequenceLetters: true,
    noCountingSequence: true,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Additional requirement checks
    const noRepeatLetters = !/(.)\1{3}/.test(value);
    const noSequenceLetters = !/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|qwerty|asdf|zxcvbnm)/i.test(value);
    const noCountingSequence = !/(012|123|234|345|456|567|678|789|890|098|987|876|765|654|543|432|321|210)/.test(value);

    // Reset all checkboxes if any additional requirement is violated
    if (!noRepeatLetters || !noSequenceLetters || !noCountingSequence) {
      setRequirements({
        minLength: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasCapitalLetter: false,
        noRepeatLetters,
        noSequenceLetters,
        noCountingSequence,
      });
    } else {
      // Otherwise, check the main requirements
      setRequirements({
        minLength: value.length >= 8 && value.length <= 20,
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[~`!@#$%^&*()\-_+=|\\/{}[\];:"'<,>.?]/.test(value),
        hasCapitalLetter: /[A-Z]/.test(value),
        noRepeatLetters,
        noSequenceLetters,
        noCountingSequence,
      });
    }
  };

  const strengthLevel = () => {
    const passedRequirements = Object.values(requirements).filter(Boolean).length;

    if (passedRequirements <= 4) return 'Low';
    if (passedRequirements === 5 || passedRequirements === 6) return 'Medium';
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
            <input type="checkbox" checked={requirements.minLength && password !== ''} readOnly />
            Minimum 8 characters and Maximum 20
          </label>
          <label>
            <input type="checkbox" checked={requirements.hasNumber && password !== ''} readOnly />
            Contains a number
          </label>
          <label>
            <input type="checkbox" checked={requirements.hasSpecialChar && password !== ''} readOnly />
            Contains a special character
          </label>
          <label>
            <input type="checkbox" checked={requirements.hasCapitalLetter && password !== ''} readOnly />
            Contains a capital letter
          </label>
        </div>

        {/* Additional requirements in red italic text when violated */}
        <div className="additional-requirements">
          {!requirements.noRepeatLetters && (
            <p className="requirement-warning">*No repeating characters more than four (4) times*</p>
          )}
          {!requirements.noSequenceLetters && (
            <p className="requirement-warning">*Letters should not follow a keyboard sequence*</p>
          )}
          {!requirements.noCountingSequence && (
            <p className="requirement-warning">*Numbers should not be in a counting sequence*</p>
          )}
        </div>

        {/* Progress bar that appears empty initially but fills as requirements are met */}
        <div className="progress-bar-container">
          <div 
            className={`progress-bar ${progressBarClass()}`}
            style={{ width: password ? `${Object.values(requirements).filter(Boolean).length * 14.3}%` : '0%' }}
          />
        </div>
        <p className="password-strength-text">Password Strength: {strengthLevel()}</p>
      </div>
    </div>
  );
};

export default PasswordGenerator;
