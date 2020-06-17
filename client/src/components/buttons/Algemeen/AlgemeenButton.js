import React from "react";
import styles from "./AlgemeenButton.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as TheePot } from './btnTheePot.svg';


const ButtonAlgemeen = ({text, linkTo}) => {
  return (
    <div className={styles}>
    <Link  to={linkTo}>
      <TheePot/>
      <p className={styles.button_title}>{text}</p>
    </Link>
  </div>
  );
};

export default ButtonAlgemeen;


