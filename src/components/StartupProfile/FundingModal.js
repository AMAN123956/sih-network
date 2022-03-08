import React from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
export default function FundingModal({
  show,
  setShow,
  handleClose,
  handleFundRaise,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ padding: "30px" }}>
        <form onSubmit={(e) => handleFundRaise(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Fundraising</Modal.Title>
          </Modal.Header>
          <div className={styles.fundForm}>
            <input
              className="formInput"
              type="input"
              placeholder="Funding Round *"
              required
            />
            <input
              className="formInput"
              type="number"
              placeholder="Amount to be raised (INR) *"
              required
            />
            <input
              type="number"
              className="formInput"
              placeholder="Equity Offered (%) *"
              required
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