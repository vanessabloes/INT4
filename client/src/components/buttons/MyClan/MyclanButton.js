import React from "react";
import styles from "./StartJourney.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

const MyClanButton = () => {
  return (
      <div className={styles.buttonContainer}>
        <Link className={styles.button} to={ROUTES.home}>
        My Clan

        </Link>
      </div>
  );
};

export default MyClanButton;
