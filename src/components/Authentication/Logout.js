import React from 'react';
import { Link } from 'react-router-dom';

// import classes from "./PageNotFound.module.css";

const Logout = (props) => {
  return (
    <div>
      <h2>You have been logged out</h2>
      <Link to="/">Click here to continue with Home Page</Link>
    </div>
  )
}

export default Logout;