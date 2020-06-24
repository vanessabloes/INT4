import React from "react";
import styles from "./BackToJourney.module.css"
import { Link } from "react-router-dom";
import { ROUTES, STATES } from "../../../consts";

import { ReactComponent as BackToJourneyLogo } from './btnBackToJourney.svg';
import { useObserver } from "mobx-react-lite";



const BackToJourney = ({ id }) => {
  console.log(id);
  return useObserver(() => (
    <div className={styles.button}>
      <Link to={ROUTES.journeyDetail.to + `${id}`}>
        <BackToJourneyLogo />
        <p className={styles.button_title}>Back to Journey</p>
      </Link>
    </div>
  ));
};

export default BackToJourney;


