import React, { useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
export default function FundingModal({
  show,
  setShow,
  handleClose,
  handleFundRaise,
}) {
  const [amount, setAmount] = useState();
  const [round, setRound] = useState();
  const [equity, setEquity] = useState();
  const [about, setAbout] = useState();
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ padding: "30px" }}>
        <form
          onSubmit={(e) =>
            handleFundRaise(e, { amount, about, round, equity, isActive: true })
          }
        >
          <Modal.Header closeButton>
            <Modal.Title>Fundraising</Modal.Title>
          </Modal.Header>
          <div className={styles.fundForm}>
            <input
              className="formInput"
              type="input"
              placeholder="Funding Round *"
              onChange={(e) => setRound(e.target.value)}
              required
            />
            <input
              className="formInput"
              type="number"
              placeholder="Amount to be raised (INR) *"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <input
              type="number"
              className="formInput"
              placeholder="Equity Offered (%) *"
              onChange={(e) => setEquity(e.target.value)}
              required
            />
            <input
              type="text"
              className="formInput"
              placeholder="Info"
              onChange={(e) => setAbout(e.target.value)}
            />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
