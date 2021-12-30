import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Profile.module.css";

const Profile = (props) => {
  const userEmail = useSelector((state) => state.email);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    branch: '',
    year: '',
    image: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:4000/profile/${userEmail}`);
        if (!res.ok) {
          throw new Error(res.status);
        }
        const userProfile = await res.json();
        setProfile(userProfile);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userEmail]);

  return (
    <div className={classes["profile-wrapper"]}>
      <div className={classes["profile-pic"]}>
        <img src="https://i.stack.imgur.com/34AD2.jpg" alt="User Profile" />
      </div>
      <div className={classes["user-details"]}>
        <p>
          <b>Name: </b>
          {profile.name ? profile.name : ""}
        </p>
        <p>
          <b>Email: </b>
          {profile.email ? profile.email : ""}
        </p>
        <p>
          <b>Branch: </b>
          {profile.branch ? profile.branch : ""}
        </p>
        <p>
          <b>Year: </b>
          {profile.year ? profile.year : ""}
        </p>
      </div>
    </div>
  );
};

export default Profile;
