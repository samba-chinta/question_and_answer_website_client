import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./Profile.module.css";

const Profile = (props) => {
  const userEmail = useSelector((state) => state.email);
  const [profile, setProfile] = useState({
    _id: "",
    name: "",
    email: "",
    branch: "",
    year: "",
    image: "",
  });

  const removeUserHandler = async () => {
    try {
      const res = await fetch(
        "https://qstn-and-ans.herokuapp.com/deleteuser"
        // "http://localhost:5000/deleteuser"
        , {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: profile._id,
        }),
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      const data = await res.json();
      console.log(data);
      localStorage.removeItem('auth-token')
      window.location = "https://question-and-answer-website.vercel.app/"
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `https://qstn-and-ans.herokuapp.com/profile/${userEmail}`
          // `http://localhost:5000/profile/${userEmail}`
        );
        if (!res.ok) {
          throw new Error(res.status);
        }
        const userProfile = await res.json();
        // console.log(userProfile)
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
        <button className={classes["deactive-btn"]} onClick={removeUserHandler}>
          Deactive Account
        </button>
      </div>
    </div>
  );
};

export default Profile;
