import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchUser,
  handleDelete,
  searchUser,
} from "../../features/user/userSlice";

const Post = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const data = useSelector((state) => state?.users?.data);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const isLoading = useSelector((state) => state?.users?.isLoading);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleDeleteFunction = (id) => {
    dispatch(handleDelete(id));
  };

  const filteredData = data?.filter((item) => {
    return selectedCategory === "All" || item?.category === selectedCategory;
  });

  const handleSearch = () => {
    if (searchTerm) {
      dispatch(searchUser(searchTerm));
    } else {
      dispatch(fetchUser());
    }
  };

  return (
    <main className="main">
      <section className="section">
        <div className="section__container">
          <div className="section__container__title">
            <h2>Post</h2>
          </div>
          <div className="section__filter">
            <label htmlFor="categoryFilter">Filter by Category: </label>
            <select
              id="categoryFilter"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option value="All">All</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>
          </div>
          <div className="section__search">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="section__wrapper">
            {isLoading ? (
              <p className="loading">Loading...</p>
            ) : (
              filteredData?.map((item) => (
                <div className="cart" key={item?.id}>
                  <Link to={`/post/${item?.id}`}>
                    <div className="cart__title">
                      <h2>{item?.name}</h2>
                    </div>
                    <div className="cart__job">
                      <span>{item?.job}</span>
                    </div>
                    <div className="cart__description">
                      <span>{item?.description}</span>
                    </div>
                    <div className="cart__category">
                      <span>Category: {item?.category || "None"}</span>
                    </div>
                  </Link>

                  {isLoggedIn && (
                    <div className="cart__btn">
                      <button
                        className="delete"
                        onClick={() => handleDeleteFunction(item?.id)}
                      >
                        Delete
                      </button>
                      <Link to={`/editpost/${item?.id}`}>
                        <button className="edit">Edit</button>
                      </Link>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Post;
