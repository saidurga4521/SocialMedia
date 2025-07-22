import React, { useState, useRef, useEffect } from "react";
import "../styles/postUpload.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { GetPostById, uploadPost } from "../services/Post";
import { useDispatch } from "react-redux";
import { createPosts, updatePosts } from "../../toolkit/postSlice";
const PostUpLoadForm = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState(null);
  const [loading, setLoading] = useState(false);
  //redux
  const dispatch = useDispatch();
  //This code is for update or edit the  the post
  const currentMode = window.location.href.includes("/editpost")
    ? "Edit"
    : "Add";
  const getPostById = async (id) => {
    try {
      const { data } = await GetPostById(id);
      if (data.success) {
        setPreview(data.data.image);
        setCaption(data.data.text);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (currentMode === "Add") {
      return;
    }
    const postId = window.location.href.split("/").pop();
    // console.log("postId", postId);
    getPostById(postId);
  }, []);
  const handleImageChange = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };
  const inputref = useRef(null);
  const handleTextChange = (e) => {
    setCaption(e.target.value);
  };
  const handleRemoveImage = () => {
    setFile(null);
    setPreview(null);
    inputref.current.value = "";
  };
  //Api integration
  const handlePost = async () => {
    setLoading(true);
    if (!file || !caption) {
      toast.error("please fill the details");
      return;
    }
    try {
      let updatedURL = "";
      if (!file) {
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      const response1 = await uploadPost(formData);
      updatedURL = response1?.data?.data?.file_url;
      //now upload the "updatedURL" in database
      //Its a protected route so we add token also
      const payload = {
        text: caption,
        image: updatedURL,
      };

      if (currentMode === "Edit") {
        const postId = window.location.href.split("/")?.pop();
        // try {
        //   const { data } = await UpdatePost(payload, postId);
        //   if (!data.success) {
        //     return;
        //   }
        //   console.log("updated", data);
        //   setCaption(null);
        //   setPreview(null);
        //   toast.success("succefully Updated");
        // } catch (error) {
        //   console.log("error", error);
        // }
        await dispatch(updatePosts({ data: payload, id: postId })).unwrap();
        setCaption(null);
        setPreview(null);
        return;
      }
      // const response2 = await createPost(payload);
      // console.log("response", response2);
      // if (!response2?.data?.success) {
      //   toast.error("something went wrong");
      //   return;
      // }
      // toast.success("post created sucessfully");
      await dispatch(createPosts(payload)).unwrap();
      setCaption(null);
      setFile(null);
      setPreview(null);
      setLoading(false);
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="upload-container">
        <div className="upload-box" onClick={() => inputref.current.click()}>
          {preview ? (
            <div className="img-container">
              <img src={preview} alt="image" className="image" />
              <FaTimes
                className="remove-image-icon"
                onClick={handleRemoveImage}
              />
            </div>
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={inputref}
                hidden
              />
              <FaPlus className="upload-icon" size={32} />
            </>
          )}
        </div>
        <textarea
          name=""
          className="text-box"
          placeholder="write something..."
          onChange={handleTextChange}
          value={caption}
        />
        {currentMode === "Add" ? (
          <button className="post" onClick={handlePost} disabled={loading}>
            {loading ? "Loading..." : "Post"}
          </button>
        ) : (
          <button className="post" onClick={handlePost} disabled={loading}>
            {loading ? "Loading..." : "Edit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PostUpLoadForm;
