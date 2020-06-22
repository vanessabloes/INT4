import React from "react";
import styles from "./TheePotLink.module.css"

import { ReactComponent as TheePot } from './btnTheePot.svg';



const TheePotFlow = ({text, onClick}) => {


  return (
    <div className={styles.button} onClick={onClick}>
      <TheePot/>
      <p className={styles.button_title}>{text}</p>    
    </div>
  );
};

export default TheePotFlow;