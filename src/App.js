import { Navbar } from "components";
import { AddPost, Home, Post, PostDetails, SignIn, SignUp } from "./pages";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "components/PrivateRoute";
import NotFoundError from "pages/Error";
function App() {
  const route = [
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "*",
      element: <NotFoundError />,
    },
    {
      element: <PrivateRoute />,
      routes: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/post",
          element: <Post />,
        },
        {
          path: "/post/:id",
          element: <PostDetails />,
        },
        {
          path: "/addpost",
          element: <AddPost />,
        },
      ],
    },
  ];

  return (
    <BrowserRouter>
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Routes>
        {route.map((route, index) => {
          if (route.routes) {
            return (
              <Route element={route.element} key={index}>
                {route.routes.map((subRoute, subIndex) => (
                  <Route
                    element={subRoute.element}
                    path={subRoute.path}
                    key={subIndex}
                  />
                ))}
              </Route>
            );
          }
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
