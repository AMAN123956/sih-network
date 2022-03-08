// import { Button } from "bootstrap";
import React, { useEffect, useState, useContext } from "react";
import styles from "./styles.module.css";
import { TransactionContext } from "../../context/TransactionContext";
import PaymentModal from "./PaymentModal";
export const FundRaiseCard = ({
  round,
  amount,
  equity,
  isActive,
  handleFundRaise,
  id,
}) => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
  } = useContext(TransactionContext);
  const [isStartup, setIsStartup] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setIsStartup(JSON.parse(localStorage.getItem("startupUserInfo")));
    console.log(isStartup);
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    sendTransaction();
  };
  console.log(currentAccount)
  return (
    <>
      <PaymentModal
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isLoading={false}
      />
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
        <h4>
          {isStartup?.id !== id ? (
            <button onClick={() => setShow(true)}>Invest</button>
          ) : (
            ""
          )}
        </h4>
      </div>
    </>
  );
};
