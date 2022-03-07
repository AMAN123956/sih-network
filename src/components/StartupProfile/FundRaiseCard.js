import React from "react";
import styles from "./styles.module.css";
export const FundRaiseCard = ({ round, amount, equity, isActive }) => {
  return (
    <div className={styles.recentFundingCard}>
      <h4>Round:- {round}</h4>
      <h4>
        Amount {isActive ? "to be raised" : "raised"}:- &#8377;{amount}
      </h4>
      <h4>
        Equity {isActive ? "offered" : "diluted"}:- {equity}%
      </h4>
      {isActive ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 style={{ margin: "0" }}> Active Round</h4>
          <div className="active-fund"></div>
        </div>
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 style={{ margin: "0" }}>Round Closed</h4>
          <div className="inactive-fund"></div>
        </div>
      )}
    </div>
  );
};
