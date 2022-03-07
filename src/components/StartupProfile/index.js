import React, { useContext } from "react";
import { TransactionContext } from "../../context/TransactionContext";

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
    </div>
  );
};
