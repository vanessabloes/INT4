import React from "react";
import styles from "./TheePotLink.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as TheePot } from './btnTheePot.svg';


const TheePotFlow = ({text}) => {
  return (
    <div className={styles}>
      <TheePot/>
      <p className={styles.button_title}>{text}</p>
  </div>
  );
};

export default TheePotFlow;


