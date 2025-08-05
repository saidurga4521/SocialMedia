import React, { useState } from "react";
import { toast } from "react-toastify";
import { SignUpForm } from "../services/Auth";
import { LocalStorage } from "../helpers/Localstorage";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const AdminSignup = () => {
  const inputFormValues = {
    name: "",
    email: "",
    password: "",
    role: "",
  };

  const { setUser } = useAuth();
  const [formData, setFormData] = useState(inputFormValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateData(name, value);
  };

  const validateData = (name, value) => {
    let message = "";
    if (!value) {
      message = "This field is required";
    } else if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        message = "Enter a valid email address";
      }
    } else if (name === "password") {
      if (value.length < 6) {
        message = "Password must be at least 6 characters";
      }
    } else if (name === "adminCode") {
      if (!value) {
        message = "This field is required";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.entries(formData).forEach(([name, value]) =>
      validateData(name, value)
    );

    const hasErrors = Object.values(formData).some((val) => !val);
    if (hasErrors) {
      toast.error("Please fill all the details");
      return;
    }

    try {
      const response = await SignUpForm(formData);
      if (!response?.data?.message) {
        toast.error("Signup Failed");
        return;
      }

      toast.success("Admin Signup Successful");
      setUser({
        name: response?.data?.data?.name,
        email: response?.data?.data?.email,
        userId: response?.data?.data?.userId,
      });

      LocalStorage(response?.data?.data?.token);
      setFormData(inputFormValues);
      navigate("/");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label">Name</label>
      <input
        className="form-input"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
      />
      {errors.name && <p className="form-error">{errors.name}</p>}

      <label className="form-label">Email</label>
      <input
        className="form-input"
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="form-error">{errors.email}</p>}

      <label className="form-label">Password</label>
      <input
        className="form-input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="form-error">{errors.password}</p>}

      <label className="form-label">Role</label>
      <input
        className="form-input"
        type="text"
        name="role"
        value={formData.adminCode}
        onChange={handleChange}
      />
      {errors.role && <p className="form-error">{errors.role}</p>}

      <button className="form-button">Sign Up</button>
    </form>
  );
};

export default AdminSignup;
