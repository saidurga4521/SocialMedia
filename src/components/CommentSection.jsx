import React from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import "../styles/CommentSection.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { commentsUpload, deleteComments } from "../../toolkit/commentSlice";
import { useAuth } from "../context/AuthProvider";
const CommentSection = ({ postId, comments }) => {
  const [input, setInput] = useState(null);
  const { user } = useAuth();
  //redux
  const dispatch = useDispatch();
  const handleAddComments = async () => {
    if (!input) {
      toast.error("Input is required");
      return;
    }

    const payLoad = { text: input };
    // try {
    //   const { data } = await upLoadComment(payLoad, postId);
    //   if (data?.success) {
    //     await refetch(); //to display the recent data
    //     toast.success(data?.message);
    //   }
    //   console.log(data);
    //   setInput(null);
    // } catch (error) {
    //   console.log(error);
    // }
    await dispatch(commentsUpload({ data: payLoad, id: postId })).unwrap();
    setInput("");
  };
  const handleDeleteComments = async (commentId) => {
    // try {
    //   const { data } = await deleteComment(commentId);
    //   if (data.success) {
    //     toast.success(data?.message);
    //     await refetch();
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    await dispatch(deleteComments({ commentId, postId })).unwrap();
  };

  return (
    <div className="comment-section">
      <div className="comment-item">
        {comments.map((comment) => (
          <div className="comment-user" key={comment._id}>
            <div className="user-avatar">
              <span>
                {comment?.user?.name
                  .split(" ")
                  .map((ele) => ele[0])
                  ?.join("")}
              </span>
            </div>
            <p>{comment?.text}</p>
            {user.userId === comment.user._id && (
              <FaTrash
                onClick={() => handleDeleteComments(comment._id)}
                className="delete-icon"
              />
            )}
          </div>
        ))}

        <div className="comment-input">
          <input
            type="text"
            placeholder="EnterComment"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <button onClick={handleAddComments}>send</button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
