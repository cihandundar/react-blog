import React from "react";
import { Link } from "react-router-dom";

const NotFoundError = () => {
  return (
    <div className="home">
      <h1>NotFoundError</h1>
      <Link to="/post">Go Back</Link>
    </div>
  );
};

export default NotFoundError;
