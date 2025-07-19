import React from "react";
import "../styles/forgetPassword.css";
const ForgetPassword = () => {
  return (
    <div>
      <div className="forget-password-container">
        <form className="forget-password-form">
          <h2>Forgot Your Password?</h2>
          <p>Enter your registered email to receive a password reset link.</p>
          <input type="email" placeholder="Enter email" required />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
