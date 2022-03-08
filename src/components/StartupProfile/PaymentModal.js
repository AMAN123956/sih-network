import React, { useState } from "react";
import { Button, FormControl, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
export default function PaymentModal({
  show,
  setShow,
  handleClose,
  handleSubmit,
  handleChange,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} style={{ padding: "30px" }}>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            handleClose();
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Fundraising</Modal.Title>
          </Modal.Header>
          <div className={styles.fundForm}>
            <input
              className="formInput"
              type="input"
              placeholder="Address To"
              name="addressTo"
              onChange={(e) => handleChange(e, "addressTo")}
              required
            />
            <input
              className="formInput"
              type="number"
              name="amount"
              step="0.0001"
              placeholder="Amount (ETH)"
              onChange={(e) => handleChange(e, "amount")}
              required
            />
            <input
              type="text"
              className="formInput"
              name="message"
              placeholder="Enter Message"
              onChange={(e) => handleChange(e, "message")}
            />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
