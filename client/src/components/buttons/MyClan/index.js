import React from "react";
import styles from "./MyClan.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as Button } from './btnMyClan.svg';

const MyClanButton = () => {
  return (
    <>
    
    <div className={styles.buttonContainer}>
    <Link  to={ROUTES.myClan}>
      <Button className={styles.button}/>
      <p className={styles.hidden}>My Clan</p>
    </Link>
  </div>
  </>
  );
};

export default MyClanButton;


