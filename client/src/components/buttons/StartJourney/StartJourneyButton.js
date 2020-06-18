import React from "react";
import styles from "./StartJourney.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import button from "./btnNewJourney.svg";
import { ReactComponent as Button } from './btnNewJourney.svg';

const StartJourneyButton = () => {
  return (
    <div className={styles.buttonContainer}>
    <Link className={styles.button} to={ROUTES.home}>
      <Button/>
      Start new Journey
    </Link>
  </div>
  );
};

export default StartJourneyButton;


