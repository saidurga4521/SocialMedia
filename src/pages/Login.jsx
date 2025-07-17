import React, { useState } from "react";
import { LoginForm } from "../services/Auth";
import { toast } from "react-toastify";
import { LocalStorage } from "../helpers/Localstorage";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
const Login = () => {
  const intialFormValues = { email: "", password: "" };
  const [user, setUser1] = useState(intialFormValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useAuth();
  //valid the formData
  const validateFormdata = (name, value) => {
    let message = "";
    if (name === "email") {
      let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(value)) {
        message = "please fill the valid email address";
      }
    } else if (name === "password" && value.length < 6) {
      message = "Password must be more than 6 letters";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser1((prev) => ({ ...prev, [name]: value }));
    validateFormdata(name, value);
  };
  const handleClick = async (e) => {
    //to avoid refresh
    e.preventDefault();
    try {
      const response = await LoginForm(user);
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        return;
      }
      toast.success(response?.data?.message);
      LocalStorage(response?.data?.data?.token);
      setUser({
        name: response?.data?.data?.name,
        email: response?.data?.data?.email,
        userId: response?.data?.data?._id, //this is just for only shows the delete icon in myposts
      });

      navigate("/", { replace: true });
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleClick} className="login-form">
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-input"
          />
          {errors.password && <p className="error-text">{errors.password}</p>}
        </div>

        <button type="submit" className="form-button">
          Login
        </button>
        <div className="signup-redirect">
          Don’t have an account?
          <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
