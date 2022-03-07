import React, { useContext, useState } from "react";
import { TransactionContext } from "../../context/TransactionContext";
import styles from "./styles.module.css";
import { TeamCard } from "../TeamCard";
import { Button } from "react-bootstrap";
import FundingModal from "./FundingModal";
import { FundRaiseCard } from "./FundRaiseCard";
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
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
      <FundingModal show={show} setShow={setShow} handleClose={handleClose} />
      <div className={styles.startupInfo}>
        <img src="/test.png" alt="" />
        <div className={styles.name}>
          <h2>ABC Inc.</h2>
          <h4>Fintech</h4>
        </div>
      </div>
      <div className={styles.wrapper}>
        <h2>About Us</h2>
        <div className={styles.wrapperContent}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
            distinctio corporis dolores, accusantium consequatur in consequuntur
            corrupti iure quasi minus veritatis? Ratione laborum totam, numquam
            dolore nobis, nulla nemo dolor ad harum suscipit consequuntur in ex,
            aliquam at incidunt quisquam quam vel velit placeat. Cupiditate
            numquam, quod corrupti nisi molestiae iure saepe est dolore
            recusandae nihil, aut repellendus! Dolorum deserunt consequuntur
            voluptatem rerum dicta illo, incidunt necessitatibus perspiciatis
            voluptatum laboriosam, libero reiciendis eaque autem nam in placeat
            similique architecto ea excepturi aliquid voluptatibus enim, ab
            minus. Unde, facilis maxime officiis accusantium enim nemo delectus
            perferendis, exercitationem quibusdam sed ipsa sequi.
          </p>
        </div>
      </div>
      <div className={styles.wrapper}>
        <h2>Team</h2>
        <div className={styles.team}>
          <div className={styles.teamCard}>
            <TeamCard />
            <TeamCard />
            <TeamCard />
            <TeamCard />
          </div>
        </div>
      </div>
      <div className={styles.wrapper}>
        <h2>Fund Raise</h2>
        <div className={styles.wrapperContent}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
            distinctio corporis dolores, accusantium consequatur in consequuntur
            corrupti iure quasi minus veritatis? Ratione laborum totam, numquam
            dolore nobis, nulla nemo dolor ad harum suscipit consequuntur in ex,
            aliquam at incidunt quisquam quam vel velit placeat. Cupiditate
            numquam, quod corrupti nisi molestiae iure saepe est dolore
            recusandae nihil, aut repellendus! Dolorum deserunt consequuntur
            voluptatem rerum
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleShow}
          style={{ marginTop: "20px" }}
        >
          Raise Funds
        </Button>
      </div>
      <div className={styles.wrapper}>
        <h2>Recent Fund raises</h2>
        <div className={styles.wrapperContent}>
          <FundRaiseCard
            round="Series A"
            amount="100000000"
            equity="5"
            isActive={true}
          />
        </div>
      </div>
    </div>
  );
};
