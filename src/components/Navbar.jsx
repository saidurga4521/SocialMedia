// import React from "react";
// import { NavLink, replace, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthProvider";
// import { getAuthToken, LocalStorage } from "../helpers/Localstorage";
// import { LogOut } from "../services/Auth";
// import { toast } from "react-toastify";
// import { useSelector } from "react-redux";
// import "../styles/navbar.css";
// const Navbar = () => {
//   const navItems = [
//     {
//       label: "Home",
//       path: "/",
//     },
//     {
//       label: "CreatePost",
//       path: "/createpost",
//     },
//     {
//       label: "myposts",
//       path: "/myposts",
//     },
//     {
//       label: "Profile",
//       path: "/user-profile",
//     },
//     {
//       lable: "Dashboard",
//       path: "/dashboard",
//     },
//   ];
//   // const { user } = useSelector((state) => state.users);
//   const { user, setUser } = useAuth(); //1.modification
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     const token = getAuthToken();
//     try {
//       const response = await LogOut(token);
//       if (!token || !user) {
//         toast.error("Something went wrong!!");
//         return;
//       }
//       if (!response?.data?.success) {
//         toast.error(response?.data?.message);
//         return;
//       }
//       toast.success(response?.data?.message);
//       localStorage.clear();
//       setUser(null);
//       navigate("/login", { replace: true });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="navbar">
//       <div className="navbar-links">
//         {navItems.map((items, index) => (
//           <NavLink
//             key={index}
//             to={items.path}
//             className={({ isActive }) =>
//               isActive ? "active nav-link" : "nav-link"
//             }
//           >
//             {items.label}
//           </NavLink>
//         ))}
//       </div>
//       <div className="navbar-user">
//         <span>{user?.name}</span>
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthToken } from "../helpers/Localstorage";
import { LogOut } from "../services/Auth";
import { toast } from "react-toastify";
import "../styles/navbar.css";

const Navbar = () => {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "CreatePost", path: "/createpost" },
    { label: "myposts", path: "/myposts" },
    { label: "Profile", path: "/user-profile" },
  ];

  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = getAuthToken();
    try {
      const response = await LogOut(token);
      if (!token || !user) {
        toast.error("Something went wrong!!");
        return;
      }
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        return;
      }
      toast.success(response?.data?.message);
      localStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-links">
        {navItems.map((items, index) => (
          <NavLink
            key={index}
            to={items.path}
            className={({ isActive }) =>
              isActive ? "active nav-link" : "nav-link"
            }
          >
            {items.label}
          </NavLink>
        ))}
      </div>
      <div className="navbar-user">
        <span>{user?.name}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
