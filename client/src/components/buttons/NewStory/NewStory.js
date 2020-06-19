import React from "react";
import styles from "./NewStory.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as Button } from './btnNewStory.svg';
import StoryModel from "../../../models/StoryModel";
import { useStore } from "../../../hooks";

const NewStoryButton = ({ text }) => {

  const { storyStore } = useStore();

  const addNewStory = () => {
    const newStory = new StoryModel(
      {
        store: storyStore,
        journeyId: "test"
      }
    );
    
  }
  return (
    <div className={styles.buttonContainer}>
      <Link to={ROUTES.addStory}>
        <Button className={styles.button} onClick={addNewStory} />
        <p className={styles.button_title}>{text}</p>
      </Link>
    </div>
  );
};

export default NewStoryButton;


