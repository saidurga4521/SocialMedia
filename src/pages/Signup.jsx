import React, { use, useState } from "react";

import { toast } from "react-toastify";
import { SignUpForm } from "../services/Auth";
import { LocalStorage } from "../helpers/Localstorage";
import { useAuth } from "../context/AuthProvider";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const inputFormValues = {
    name: "",
    email: "",
    password: "",
  };
  const { setUser } = useAuth();
  const [formData, setFormData] = useState(inputFormValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateData(name, value);
  };
  const validateData = (name, value) => {
    let message = "";
    if (!value) {
      message = "please required this field";
    } else if (name === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        message = "please enter a valid email address";
      }
    } else if (name === "password") {
      if (value.length < 6) {
        message = "password must be in min 6 letters";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //1.while submitting also we need to validate the data
    Object.entries(formData).forEach(([name, value]) =>
      validateData(name, value)
    );
    //2.And we also check whether the data fields or filled or not
    const hasErrors = Object.values(formData).some((val) => !val);
    if (hasErrors) {
      toast.error("Please fill all the details");
      return;
    }

    try {
      setLoading(true);
      const response = await SignUpForm(formData);
      console.log(response);
      if (!response?.data?.message) {
        toast.error("SignUp Failed");
        return;
      }
      toast.success("SignUp SucessFull");

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
    } finally {
      setLoading(false);
    }
    //we need to store token in localStorage
  };
  return (
    <div className="form-container">
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

        <button className="form-button" disabled={loading}>
          {loading ? "Laoding..." : "Sign In"}
        </button>

        <div className="signup-redirect">
          Already have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
