// AddPost.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewUser } from "../../features/user/userSlice";

const AddPost = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name, description, category };
    dispatch(addNewUser(body));
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <section className="section">
      <div className="section__container">
        <div className="section__container__title">
          <h2>Add Post</h2>
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
                <option value="technology">Technology</option>
                <option value="travel">Travel</option>
              </select>
            </div>
            <button>Add Blog</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddPost;
