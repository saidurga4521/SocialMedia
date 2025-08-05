import React, { useState } from "react";
import Signup from "./Signup";
import AdminSignup from "./AdminSignup";
import "../styles/SignUpSelector.css";
import { FaUser, FaUserShield } from "react-icons/fa";

const SignupSelector = () => {
  const [role, setRole] = useState("");

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleBack = () => {
    setRole("");
  };

  return (
    <div className="selector-container">
      {!role ? (
        <div className="selector-box">
          <h2 className="selector-heading">Choose Signup Type</h2>
          <div className="selector-buttons">
            <button
              className="selector-option"
              onClick={() => handleRoleSelect("personal")}
            >
              <FaUser className="selector-icon" />
              Personal Signup
            </button>
            <button
              className="selector-option"
              onClick={() => handleRoleSelect("admin")}
            >
              <FaUserShield className="selector-icon" />
              Creator Signup
            </button>
          </div>
        </div>
      ) : (
        <div className="form-wrapper">
          <div className="form-header">
            <button className="back-button" onClick={handleBack}>
              ← Back
            </button>
            <h2>{role === "admin" ? "Creator Signup" : "Personal Signup"}</h2>
          </div>
          {role === "personal" ? <Signup /> : <AdminSignup />}
        </div>
      )}
    </div>
  );
};

export default SignupSelector;
