import React from "react";
import styles from "./BackToWorldButton.module.css"
import { Link } from "react-router-dom";
import { ROUTES, STATES } from "../../../consts";

import { ReactComponent as BackToWorld } from './btnBackToWorld.svg';
import { useStore } from "../../../hooks";


const BackToWorldButton = ({linkTo}) => {
const { launchFlowStore } = useStore()
const stateChange = () => {
  launchFlowStore.setHomeStrate(STATES.HOME_STATE_HOME);
}
  return (
    <div className={styles.button}>
    <Link to={ROUTES.home} onClick={stateChange}>
      <BackToWorld/>
      <p className={styles.button_title}>Back to World</p>
    </Link>
  </div>
  );
};

export default BackToWorldButton;


