import React from "react";
import styles from "./styles.module.css";
import { Card, Button } from "react-bootstrap";
const StartupCard = ({ name, address, sector, imgUrl, id, navigatePage }) => {
  if (!imgUrl)
    imgUrl =
      "https://api.startupindia.gov.in/sih/api/file/user/image/Startup?fileName=e98cf97c-a79e-4542-bf8f-77dcc5340b87.png";
  return (
    <Card
      className="mx-2 my-2 shadow"
      style={{ width: "16rem", padding: "0px" }}
    >
      <Card.Body>
        <div className={styles.section1}>
          <img className={styles.logo} src={imgUrl} alt="startup_img" />
          <Card.Title className="mx-3">
            {name} <br /> <p className="text-secondary">{sector}</p>
          </Card.Title>
        </div>

        <Button
          className={styles.detailBtn}
          onClick={(e) => navigatePage(e, id)}
        >
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default StartupCard;
