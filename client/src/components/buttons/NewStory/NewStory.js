import React from "react";
import styles from "./NewStory.module.css"
import { Link, useParams } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as Button } from './btnNewStory.svg';
import StoryModel from "../../../models/StoryModel";
import { useStore } from "../../../hooks";
import { useObserver } from "mobx-react-lite";
import DefinedStoryWordModel from "../../../models/DefinedStoryWordModel";
import { v4 } from "uuid";
import JourneyStore from "../../../stores/JourneyStore";
import DefinedWordStore from "../../../stores/DefinedWordStore";

const NewStoryButton = ({ text, id }) => {

  const { storyStore, uiStore, journeyStore, definedWordStore } = useStore();


    
  const addNewStory = () => {
    const journey = journeyStore.resolveJourney(id)
    
    const newStory = new StoryModel({
        store: storyStore,
        journeyId: id
      });
    uiStore.setCurrentStory(newStory);
    definedWordStore.getDefinedWords(id);

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


