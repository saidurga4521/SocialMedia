import React, { useEffect, useState } from "react";
import {
  FaComment,
  FaEdit,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import "../styles/postCard.css";

import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import CommentSection from "./CommentSection";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePostById,
  postDisLikeById,
  postLikeById,
} from "../../toolkit/postSlice";
import { fetchComments } from "../../toolkit/commentSlice";
const PostCard = ({ post }) => {
  const { user } = useAuth();
  //This is for comment section
  const [showComments, setShowComments] = useState(false);
  //redux
  const dispatch = useDispatch();
  const comments = useSelector(
    (state) => state.comments.commentsByPostId[post._id] || []
  );
  //Getting Comments
  const getComments = async () => {
    // try {
    //   const { data } = await getCommentsByPostId(post._id);
    //   console.log("comments", data);
    //   setComments(data?.data);
    // } catch (error) {
    //   console.log(error);
    // }
    await dispatch(fetchComments(post._id)).unwrap();
  };
  useEffect(() => {
    getComments();
  }, []);
  const handleDeletePost = async (id) => {
    // try {
    //   const { data } = await deletePosts(post._id);
    //   console.log(data);
    // } catch (error) {
    //   console.log("error", error);
    // }
    // await refetch();
    await dispatch(deletePostById(id)).unwrap();
  };
  const navigate = useNavigate();
  const handleEditPost = () => {
    navigate(`/editpost/${post._id}`);
  };
  //This is for likes and dislikes
  const handleLike = async (id) => {
    // try {
    //   const { data } = await PostLike(id);
    //   console.log("data", data);
    //   console.log("user", user);
    //   if (!data.success) {
    //     return;
    //   }
    //   toast.success("Post Liked Successfully");
    //   await refetch();
    // } catch (error) {
    //   console.log("error", error);
    // }
    await dispatch(postLikeById(id)).unwrap();
  };

  const handledisLike = async (id) => {
    // try {
    //   const { data } = await PostUnLike(id);
    //   console.log("data", data);
    //   if (!data.success) {
    //     return;
    //   }
    //   toast.success("Post UnLiked Successfully");
    //   await refetch();
    // } catch (error) {
    //   console.log("error", error);
    // }
    await dispatch(postDisLikeById(id)).unwrap();
  };

  return (
    <div className="postCard">
      <div className="post-header">
        <div className="user-info">{post?.user?.name}</div>
        <div className="date">{post?.createdAt.split("T")[0]}</div>
        {window.location.href.includes("/myposts") && (
          <>
            <FaTrash
              className="delete-icon"
              onClick={() => handleDeletePost(post._id)}
            />
            <FaEdit className="edit-icon" onClick={handleEditPost} />
          </>
        )}
      </div>
      <div className="post-img">
        <img src={post?.image} alt="image" />
      </div>
      <div className="caption">{post?.text}</div>
      <div className="user-actions">
        <span>
          {post.likes.includes(user?.userId) ? (
            <FaHeart
              onClick={() => handledisLike(post._id)}
              className="like-icon"
            />
          ) : (
            <FaRegHeart
              className="like-icon"
              onClick={() => handleLike(post._id)}
            />
          )}
          {" " + post?.likesCount}
        </span>

        <span>
          <FaComment
            className="comment-icon"
            onClick={() => setShowComments((prev) => !prev)}
          />
        </span>
        <span>
          <FaShare />
        </span>
      </div>
      {showComments && <CommentSection postId={post._id} comments={comments} />}
    </div>
  );
};

export default PostCard;
