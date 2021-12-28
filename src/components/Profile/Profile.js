import React from "react";

import classes from "./Profile.module.css";

const Profile = (props) => {

  return (
    <div className={classes["profile-wrapper"]}>
      <div className={classes["profile-pic"]}>
        <img src="https://i.stack.imgur.com/34AD2.jpg" alt="User Profile" />
      </div>
      <div className={classes["user-details"]}>
        <p>
          <b>Name: </b>
          Samba Chinta
        </p>
        <p>
          <b>Email: </b>
          19131a0542@gvpce.ac.in
        </p>
        <p>
          <b>Branch: </b>
          Computer Science
        </p>
        <p>
          <b>Year: </b>
          3
        </p>
      </div>
    </div>
  );
};

export default Profile;
