import React from "react";

import classes from "./MessageModal.module.css";

const MessageModal = (props) => {
  return (
    <div
      className={classes["messageModal_Wrapper"]}
      style={{ backgroundColor: props.color }}
    >
      <small className={classes["message"]}>{props.message}</small>
    </div>
  );
};

export default MessageModal;
