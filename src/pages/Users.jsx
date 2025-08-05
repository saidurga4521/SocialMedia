import React, { useEffect, useState } from "react";
import { getAllUsers, UserFollow, UserUnFollow } from "../services/Auth";
import "../styles/Users.css";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setusers] = useState([]);
  const { user } = useAuth();

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setusers(response?.data?.data);
      console.log("the data", response?.data?.data);
    } catch (error) {
      console.log("the all users error", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleUserFollow = async (userId) => {
    try {
      const response = await UserFollow(userId);
      toast.success(response?.data?.data?.message);

      setusers((prevUsers) =>
        prevUsers.map((u) => {
          if (u._id === userId) {
            const isFollowing = u.followers.includes(user?.userId);
            return {
              ...u,
              followers: isFollowing
                ? u.followers.filter((id) => id !== user?.userId)
                : [...u.followers, user?.userId],
            };
          }
          return u;
        })
      );
    } catch (error) {
      console.log("the follow error", error);
    }
  };

  const handleUserUnFollow = async (userId) => {
    try {
      const response = await UserUnFollow(userId);
      toast.success(response?.data?.data?.message);

      setusers((prevUsers) =>
        prevUsers.map((u) => {
          if (u._id === userId) {
            const isFollowing = u.followers.includes(user?.userId);
            return {
              ...u,
              followers: isFollowing
                ? u.followers.filter((id) => id !== user?.userId)
                : [...u.followers, user?.userId],
            };
          }
          return u;
        })
      );
    } catch (error) {
      console.log("the follow error", error);
    }
  };

  return (
    <div>
      <div className="heading">Friends</div>
      {users.map((User) => (
        <div className="user" key={User._id}>
          <span className="Profile-name">
            {User?.name
              .split(" ")
              .map((ele) => ele[0])
              ?.join("")}
          </span>
          {User.name}{" "}
          {User.followers.includes(user?.userId) ? (
            <span
              className="unfollow-btn"
              onClick={() => {
                handleUserUnFollow(User?._id);
              }}
            >
              Unfollow
            </span>
          ) : (
            <span
              className="follow-btn"
              onClick={() => {
                handleUserFollow(User?._id);
              }}
            >
              Follow
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Users;
