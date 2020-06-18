import React from "react";
import styles from "./AddMemberButton.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as AddMember } from './btnAddMember.svg';

const AddMemberButton = ({text, linkTo}) => {
  return (
    <div className={styles.buttonContainer}>
    <Link  to={linkTo}>
      <AddMember/>
      <p className={styles.button_title}>{text}</p>
    </Link>
  </div>
  );
};

export default AddMemberButton;


