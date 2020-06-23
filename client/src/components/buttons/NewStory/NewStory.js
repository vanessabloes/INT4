import React from "react";
import styles from "./NewStory.module.css"
import { Link, useParams, useHistory } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as Button } from './btnNewStory.svg';
import StoryModel from "../../../models/StoryModel";
import { useStore } from "../../../hooks";
import { useObserver } from "mobx-react-lite";


const NewStoryButton = ({ text, id }) => {

  const { storyStore, uiStore, journeyStore, definedWordStore } = useStore();


  const history = useHistory();  
  const addNewStory = async () => {

    const journey = journeyStore.resolveJourney(id)
    console.log("im clikced")
    const newStory = new StoryModel({
        journeyId: id,
        contextId: "",
        levelId: "",
        store: storyStore,
       
      });
   console.log(newStory.id) // check
    await uiStore.setCurrentJourney(journey); //check
    await uiStore.setCurrentStory(newStory); //check
    await definedWordStore.getDefinedWords(newStory.id);
    await newStory.create();
    history.push(`${id}` + ROUTES.addStory.to + `/`+ uiStore.currentStory.id)

  }
  return useObserver(() => (
    <div className={styles.buttonContainer}>
      <button onClick={addNewStory}>
        
          <Button className={styles.button} />
          <p className={styles.button_title}>{text}</p>
     
      </button>
    </div>
  ));
};

export default NewStoryButton;


