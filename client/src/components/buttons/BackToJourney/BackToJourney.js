import React from "react";
import styles from "./BackToJourney.module.css"
import { Link } from "react-router-dom";
import { ROUTES, STATES } from "../../../consts";

import { ReactComponent as BackToJourneyLogo } from './btnBackToJourney.svg';
import { useStore } from "../../../hooks";


const BackToJourney = ({linkTo}) => {
const { launchFlowStore } = useStore()
const stateChange = () => {
  launchFlowStore.setHomeStrate(STATES.HOME_STATE_HOME);
}
  return (
    <div className={styles.button}>
    <Link to={ROUTES.home} onClick={stateChange}>
      <BackToJourneyLogo/>
      <p className={styles.button_title}>Back to Journey</p>
    </Link>
  </div>
  );
};

export default BackToJourney;


