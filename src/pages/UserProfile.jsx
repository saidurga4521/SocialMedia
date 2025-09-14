// import React, { useEffect, useState } from "react";
// import { getuserInfo } from "../services/Profile";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsers, updateprofile } from "../../toolkit/userSlice";
// import "../styles/profile.css";
// const UserProfile = () => {
//   //redux
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.users);
//   const [profile, setProfile] = useState({
//     name: "",
//     email: "",
//   });
//   const handleNameChange = (e) => {
//     setProfile({
//       ...profile,
//       name: e.target.value,
//     });
//   };
//   const fetchLoggedData = async () => {
//     console.log("datausers", user);

//     dispatch(fetchUsers(getuserInfo));
//     // try {
//     //   const { data } = await getuserInfo();
//     //   console.log("data", data);
//     //   if (data?.success) {
//     setProfile({
//       ...profile,
//       name: user?.name,
//       email: user?.email,
//     });
//     //   }
//     // } catch (error) {
//     //   console.log("error", error);
//     // }
//   };
//   useEffect(() => {
//     fetchLoggedData();
//   }, []);
//   const handleUpdateProfile = async () => {
//     // try {
//     //   const { data } = await UpdateProfile({ name: profile.name });
//     //   if (data?.success) {
//     //     toast.success(data?.message);
//     //     await fetchLoggedData();
//     //   }
//     // } catch (error) {
//     //   console.log("error", error);
//     // }
//     await dispatch(updateprofile({ name: profile.name })).unwrap();
//   };
//   return (
//     <div className="profile-form-container">
//       <label>Name</label>
//       <input
//         type="text"
//         name="name"
//         onChange={handleNameChange}
//         value={profile?.name}
//       />
//       <label>Email</label>
//       <input type="text" name="email" disabled value={profile?.email} />
//       <button onClick={handleUpdateProfile}>Update</button>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useEffect, useState } from "react";
import { getuserInfo } from "../services/Profile";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateprofile } from "../../toolkit/userSlice";
import "../styles/profile.css";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.users);
  console.log("isLoading", isLoading);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    // fetch user from backend
    dispatch(fetchUsers(getuserInfo));
  }, [dispatch]);

  useEffect(() => {
    // sync Redux user to local state when it updates
    if (user?.name && user?.email) {
      setProfile({
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleNameChange = (e) => {
    setProfile({
      ...profile,
      name: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    await dispatch(updateprofile({ name: profile.name })).unwrap();
    // isLoading = false;
    dispatch(fetchUsers(getuserInfo)); // Refresh Redux state after update
  };

  return (
    <div className="profile-form-container">
      <label>Name</label>
      <input
        type="text"
        name="name"
        onChange={handleNameChange}
        value={profile.name}
      />
      <label>Email</label>
      <input type="text" name="email" disabled value={profile.email} />
      <button onClick={handleUpdateProfile}>
        {isLoading ? "Loading..." : "update"}
      </button>
    </div>
  );
};

export default UserProfile;
