import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import styles from "./styles.module.css";
import { TeamCard } from "../TeamCard";
// import { button } from "react-bootstrap";
import FundingModal from "./FundingModal";
import { FundRaiseCard } from "./FundRaiseCard";
import { GetStartup, PostFundRaise } from "../../services/FundServices";
import { useParams } from "react-router-dom";
const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
  />
);

export const StartupProfile = () => {
  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    isLoading,
  } = useContext(TransactionContext);
  let companyId = "62250862f714a055d865f59b";
  const [show, setShow] = useState(false);
  const [startup, setStartup] = useState(null);
  let { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log(id);
    GetStartup(id).then(res=>setStartup(res.data.data));
  }, []);
  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  const handleFundRaise = (e, data) => {
    e.preventDefault();
    data.companyWallet = currentAccount;
    PostFundRaise(data, id).then((res) => setStartup(res.data));
  };
  console.log(startup);
  return (
    <>
      {startup === null ? (
        <h1>Loading</h1>
      ) : (
        <div className={styles.container}>
          {/* {!currentAccount && (
        <button type="button" onClick={connectWallet}>
          <p>Connect Wallet</p>
        </button>
      )}
      <div>
        <Input
          placeholder="Address To"
          name="addressTo"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Amount (ETH)"
          name="amount"
          type="number"
          handleChange={handleChange}
        />
        <Input
          placeholder="Keyword (Gif)"
          name="keyword"
          type="text"
          handleChange={handleChange}
        />
        <Input
          placeholder="Enter Message"
          name="message"
          type="text"
          handleChange={handleChange}
        />

        <div />

        {isLoading ? (
          <h2>Loading</h2>
        ) : (
          <button type="button" onClick={handleSubmit}>
            Send now
          </button>
        )}
      </div> */}
          <FundingModal
            show={show}
            setShow={setShow}
            handleClose={handleClose}
            handleFundRaise={handleFundRaise}
            isLoading={false}
          />
          <div className={styles.startupInfo}>
            <img src="/test.png" alt="" />
            <div className={styles.name}>
              <h2>{startup?.name}</h2>
              <h5>{startup?.industry}</h5>
              <h6>{startup?.companyNumber}</h6>
            </div>
            {!currentAccount ? (
              <button variant="primary" onClick={connectWallet}>
                Connect Wallet
              </button>
            ) : (
              ""
            )}
          </div>
          <div className={styles.wrapper}>
            <h2>About Us</h2>
            <div className={styles.wrapperContent}>
              <p>{startup?.about}</p>
            </div>
          </div>
          <div className={styles.wrapper}>
            <h2>Team</h2>
            <div className={styles.team}>
              <div className={styles.teamCard}>
                {startup?.coFounders?.map((co) => (
                  <TeamCard />
                ))}
                {startup?.coFounders?.length === 0 ? (
                  <h4>Team Not Added</h4>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className={styles.wrapper}>
            <h2>Fund Raise</h2>
            <div className={styles.wrapperContent}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Numquam distinctio corporis dolores, accusantium consequatur in
                consequuntur corrupti iure quasi minus veritatis? Ratione
                laborum totam, numquam dolore nobis, nulla nemo dolor ad harum
                suscipit consequuntur in ex, aliquam at incidunt quisquam quam
                vel velit placeat. Cupiditate numquam, quod corrupti nisi
                molestiae iure saepe est dolore recusandae nihil, aut
                repellendus! Dolorum deserunt consequuntur voluptatem rerum
              </p>
            </div>
            <button
              variant="primary"
              onClick={handleShow}
              style={{ marginTop: "20px" }}
            >
              Raise Funds
            </button>
          </div>
          <div className={styles.wrapper}>
            <h2>Recent Fund raises</h2>
            <div className={styles.fundinglist}>
              {startup?.recentFunding?.map((fund) => (
                <FundRaiseCard
                  round={fund.round}
                  amount={fund.amount}
                  equity={fund.equity}
                  isActive={true}
                  id={id}
                />
              ))}
              {startup?.recentFunding?.length === 0 ? (
                <h4>Company has not raised any funds yet</h4>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
