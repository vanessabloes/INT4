import React from "react";
import styles from "./AlgemeenButton.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as AddMember } from './btnAddMember.svg';
import { ReactComponent as BackToWorld } from './btnBackToWorld.svg';
import { ReactComponent as TheePot } from './btnTheePot.svg';


const ButtonAlgemeen = ({text, linkTo}) => {
  return (
    <div className={styles}>
    <Link  to={linkTo}>
      <TheePot/>
      <p>{text}</p>
    </Link>
  </div>
  );
};

export default ButtonAlgemeen;


