import React from "react";
import styles from "./StartJourney.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

const StartJourneyButton = () => {
  return (
      <div className={styles.buttonContainer}>
        <Link className={styles.button} to={ROUTES.home}>
        Start new Journey

        </Link>
      </div>
  );
};

export default StartJourneyButton;
