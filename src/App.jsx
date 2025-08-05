import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";

import ProtectedRoute from "./hoc/ProtectedRoute";
import PostUpLoadForm from "./pages/PostUpLoadForm";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";

import { getuserInfo } from "./services/Profile";
import { useAuth } from "./context/AuthProvider";
import Analytics from "./pages/Analytics";
import ForgetPassword from "./pages/ForgetPassword";
import SignupSelector from "./pages/SignupSelector";
import Profile from "./pages/Profile";

const App = () => {
  const { user, setUser } = useAuth();
  const fetchLoggedData = async () => {
    try {
      const { data } = await getuserInfo();

      if (data?.success) {
        setUser({
          name: data?.data?.user?.name,
          email: data?.data?.user?.email,
          userId: data?.data?.user?._id,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchLoggedData();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myposts"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute isPublic={true}>
              <SignupSelector />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgetpassword"
          element={
            <ProtectedRoute isPublic={true}>
              <ForgetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createpost"
          element={
            <ProtectedRoute>
              <PostUpLoadForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editpost/:id"
          element={
            <ProtectedRoute>
              <PostUpLoadForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {/* dashboard
        <Route path="/dashboard" element={<Analytics />} /> */}
        <Route
          path="/login"
          element={
            <ProtectedRoute isPublic={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
