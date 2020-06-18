import React from "react";
import styles from "./NewStory.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as Button } from './btnNewStory.svg';

const NewStoryButton = ({text}) => {
  return (
    <div className={styles.buttonContainer}>
    <Link  to={ROUTES.addStory}>
      <Button className={styles.button}/>
      <p className={styles.button_title}>{text}</p>
    </Link>
  </div>
  );
};

export default NewStoryButton;


