import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editTask, fetchUserDetails } from "../../features/user/userSlice";

const EditPost = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, description, category };
    dispatch(editTask({ id: postId, body }));
    setTimeout(() => {
      navigate("/post");
    }, 2000);
  };

  const { postId } = useParams();
  const postDetails = useSelector((state) => state.users.details);

  useEffect(() => {
    dispatch(fetchUserDetails(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    setName(postDetails.name || "");
    setDescription(postDetails.description || "");
    setCategory(postDetails.category || "");
  }, [postDetails]);
  return (
    <section className="section">
      <div className="section__container">
        <div className="section__container__title">
          <h2>Edit Post</h2>
        </div>

        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="container__item">
              <label>Title</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="container__item">
              <label>Description</label>
              <textarea
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="container__item">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <button>Edit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditPost;
