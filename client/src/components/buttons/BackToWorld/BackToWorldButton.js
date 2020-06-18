import React from "react";
import styles from "./BackToWorldButton.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as BackToWorld } from './btnBackToWorld.svg';


const BackToWorldButton = ({linkTo}) => {
  return (
    <div className={styles.button}>
    <Link  to={ROUTES.home}>
      <BackToWorld/>
      <p className={styles.button_title}>Back to World</p>
    </Link>
  </div>
  );
};

export default BackToWorldButton;


