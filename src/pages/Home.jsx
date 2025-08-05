import React, { useEffect, useState } from "react";
import { getMyPosts, getPosts } from "../services/Post";
import PostCard from "../components/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../toolkit/postSlice";
import "../styles/home.css";

import Users from "./Users";
import { fetchUsers } from "../../toolkit/userSlice";
import { getuserInfo } from "../services/Profile";
const Home = () => {
  // const [posts, setPosts] = useState([]);
  // const [Loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  //This logic for getting all posts and my posts
  const fetcherPosts = window.location.href.includes("/myposts")
    ? getMyPosts
    : getPosts;
  const getFetchPosts = async () => {
    // try {
    //   const token = getAuthToken();
    //   setLoading(true);
    //   const response = await fetchPosts();
    //   setPosts(response?.data?.data);
    //   setLoading(false);
    // } catch (error) {
    //   console.log("error", error);
    // } finally {
    //   setLoading(false);
    // }
    dispatch(fetchPosts(fetcherPosts));
  };
  useEffect(() => {
    getFetchPosts();
  }, [fetcherPosts]);
  useEffect(() => {
    // fetch user from backend
    dispatch(fetchUsers(getuserInfo));
  }, [dispatch]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (posts.length === 0) {
    return <div>no posts please add it</div>;
  }
  //for all users

  return (
    <div className="home-container">
      <div className="AllPosts">
        {posts.map((post) => (
          <div key={post._id}>
            <PostCard post={post} refetch={getFetchPosts} />
          </div>
        ))}
      </div>
      <div className="followersContainer">
        <Users />
      </div>
    </div>
  );
};

export default Home;
