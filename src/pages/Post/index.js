import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser, handleDelete } from "../../features/user/userSlice";

const Post = () => {
  const data = useSelector((state) => state?.users?.data);
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.users?.isLoading);

  console.log(isLoading);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleDeleteFunction = (id) => {
    dispatch(handleDelete(id));
  };

  return (
    <main className="main">
      <section className="section">
        <div className="section__container">
          <div className="section__container__title">
            <h2>Post</h2>
          </div>
          <div className="section__wrapper">
            {isLoading ? (
              <p className="loading">Loading...</p>
            ) : (
              data?.map((item) => (
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
