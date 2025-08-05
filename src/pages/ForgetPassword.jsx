import React, { useState } from "react";
import "../styles/forgetPassword.css";
import { toast } from "react-toastify";
import { forgotPassword } from "../services/Auth";
const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email,
      };

      const response = await forgotPassword(payload);
      toast.success("reset link send to you mail");
    } catch (error) {
      console.log("the error", error.message);
    }
  };
  console.log("the payload", email);
  return (
    <div>
      <div className="forget-password-container">
        <form className="forget-password-form">
          <h2>Forgot Your Password?</h2>
          <p>Enter your registered email to receive a password reset link.</p>
          <input
            type="email"
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
          <button type="submit" onClick={handleClick}>
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
