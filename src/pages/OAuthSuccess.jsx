import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OAuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log("the token", token);

    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
};

export default OAuthSuccess;
