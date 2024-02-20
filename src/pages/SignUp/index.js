import React, { useEffect, useState } from "react";
import { reset, register } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const SignUp = () => {
  const isLoading = useSelector((state) => state?.post?.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    userName: "",
    password: "",
    passwordControl: "",
  });

  const { email, userName, password, passwordControl } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== passwordControl) {
      toast.warning("Parolalar eşleşmedi");
    } else {
      const userData = {
        email,
        password,
        userName,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <section className="register">
      {isLoading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="register__container">
          <div className="right">
            <div>
              <h1>Create account</h1>
            </div>
            <div>
              <form onSubmit={onSubmit} className="form">
                <div className="form__group">
                  <input
                    type="text"
                    className="form__control"
                    id="userName"
                    name="userName"
                    value={userName}
                    placeholder="Enter name"
                    onChange={onChange}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="email"
                    className="form__control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={onChange}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    className="form__control"
                    id="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={onChange}
                  />
                </div>
                <div className="form__group">
                  <input
                    type="password"
                    className="form__control"
                    id="passwordControl"
                    name="passwordControl"
                    value={passwordControl}
                    placeholder="Re-enter password"
                    onChange={onChange}
                  />
                </div>
                <div className="form__group">
                  <button type="submit">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SignUp;
