import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/profileUser.css";
import { NavLink, useLocation } from "react-router-dom";
import {
  getAllFollowers,
  getAllFollowings,
  getLoggedUser,
} from "../services/Auth";
const Profile = () => {
  const user = useSelector((state) => state.users.user);

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const location = useLocation();
  // const getUser = async () => {
  //   try {
  //     const response = await getLoggedUser();
  //     setUser(response?.data?.data);
  //   } catch (error) {
  //     console.log("the user error", error);
  //   }
  // };
  const followersUsers = async () => {
    try {
      const response = await getAllFollowers();
      setFollowers(response?.data?.data.followers);
    } catch (error) {
      console.log("the followers error", error);
    }
  };
  const followeingsUsers = async () => {
    try {
      const response = await getAllFollowings();
      setFollowings(response?.data?.data.followings);
    } catch (error) {
      console.log("the followers error", error);
    }
  };
  useEffect(() => {
    followersUsers();
    followeingsUsers();
  }, [location]);
  console.log("the user1", user);
  console.log("the followers", followers);
  console.log("the followings", followings);
  return (
    <div>
      <div className="profile-container">
        <div className="left-container">
          <span className="profile-name">
            {user?.name
              .split(" ")
              .map((ele) => ele[0])
              ?.join("")}
          </span>
        </div>
        <div className="right-container">
          <div className="up">
            <span className="name">{user?.name}</span>
            <NavLink to="/user-profile">
              <span className="edit-profile">Edit Profile</span>
            </NavLink>
          </div>
          <div className="down">
            <span className="followers">
              followers:{user?.followers.length}
            </span>
            <span className="followings">
              followings:{user?.followings.length}
            </span>
          </div>
        </div>
      </div>
      <div className="followers-container">
        <div className="followers">
          <span className="heading">Followers</span>
          {followers.map((follower, idx) => (
            <div key={idx} className="follower">
              <span className="ProfileName">
                {follower?.name
                  .split(" ")
                  .map((ele) => ele[0])
                  ?.join("")}
              </span>
              <span className="follower-name">{follower?.name}</span>
            </div>
          ))}
        </div>
        <div className="followings">
          <span className="heading">Followings</span>
          {followings.map((following, idx) => (
            <div key={idx} className="follower">
              <span className="ProfileName">
                {following?.name
                  .split(" ")
                  .map((ele) => ele[0])
                  ?.join("")}
              </span>
              <span className="following-Name">{following?.name}</span>
              <span className="status">following</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
