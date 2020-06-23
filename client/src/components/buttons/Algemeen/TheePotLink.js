import React from "react";
import styles from "./TheePotLink.module.css"
import { Link } from "react-router-dom";

import { ReactComponent as TheePot } from './btnTheePot.svg';


const TheePotLink = ({text, linkTo}) => {
  return (
    <div className={styles}>
    <Link to={linkTo}>
      <TheePot/>
      <p className={styles.button_title}>{text}</p>
    </Link>
  </div>
  );
};

export default TheePotLink;


