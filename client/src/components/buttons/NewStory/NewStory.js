import React from "react";
import styles from "./NewStory.module.css"
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as Button } from './btnNewStory.svg';
import StoryModel from "../../../models/StoryModel";
import { useStore } from "../../../hooks";
import { useObserver } from "mobx-react-lite";

const NewStoryButton = ({ text, id }) => {

  const { storyStore, uiStore } = useStore();

  const addNewStory = () => {
    const newStory = new StoryModel(
      {
        store: storyStore,
        journeyId: "test"
      }
    );

  }
  return useObserver(() => (
    <div className={styles.buttonContainer}>
      <button onClick={addNewStory}>
        <Link to={`${id}` + ROUTES.addStory.to}>
          <Button className={styles.button} />
          <p className={styles.button_title}>{text}</p>
        </Link>
      </button>
    </div>
  ));
};

export default NewStoryButton;


