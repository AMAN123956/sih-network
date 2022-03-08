import React from "react";
import styles from "./styles.module.css";
export const TeamCard = ({name}) => {
  return (
    <div className={styles.container}>
      <img src="https://res.cloudinary.com/abhistrike/image/upload/v1626953029/avatar-370-456322_wdwimj.png" alt="" />
      <h4>{name}</h4>
      <h6>Co founder</h6>
    </div>
  );
};
