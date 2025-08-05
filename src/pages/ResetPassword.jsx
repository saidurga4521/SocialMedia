import React, { useState } from "react";
import "../styles/ResetPassword.css";
import { toast } from "react-toastify";
import { resetPassword } from "../services/Auth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const url = window.location.href;
  const token = new URL(url).searchParams.get("token");

  const handleClick = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const payload = {
      token: token,
      newPassword: confirmPassword,
    };

    try {
      const response = await resetPassword(payload);

      toast.success("Password reset successful!");
    } catch (error) {
      console.log("The error", error);
      toast.error("Something went wrong");
    }
  };
  console.log("the token", token);
  return (
    <div className="formContainer">
      <label>Password:</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <label>Confirm Password:</label>
      <input
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="btn" onClick={handleClick}>
        Change Password
      </button>
    </div>
  );
};

export default ResetPassword;
