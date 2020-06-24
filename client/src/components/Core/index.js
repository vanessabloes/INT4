import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react-lite";
import Wordwheel from "../Wordwheel";
import { useStore } from "../../hooks";
import Manual from "../Manual";
import { useParams } from "react-router-dom";
import ProgressFlame from "../ProgressFlames";
import styles from "./Core.module.css";
import BackToJourney from "../buttons/BackToJourney/BackToJourney";
import Loading from "../Loading";
import TheePotLink from "../buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";


const Core = () => {


  const showManual = () => {
    uiStore.setManualVisibility(true);
  }

  const { uiStore, journeyStore, storyStore } = useStore();
  const { id, storyId } = useParams();
  const STATE_LOADING = 'loading';
  const STATE_NOT_FOUND = 'notFound';
  const STATE_LOADED = 'fully loaded';

  const [story, setStory] = useState(storyStore.resolveStory(storyId));
  const [state, setState] = useState(STATE_LOADING);



  useEffect(() => {

    const loadStory = async (id, storyId) => {

      
      console.log(id)
      console.log(storyId)

      const story = await storyStore.loadStory(storyId);
      const journey = await journeyStore.loadJourney(id);

      await uiStore.setCurrentJourney(journey);
      await uiStore.setCurrentStory(story);
      await storyStore.loadDefinedStoryWordsForStory(storyId);
      console.log(story)
      console.log(journey)
      if (!story) {
        setState(STATE_NOT_FOUND);
        return;
      }

      setStory(story);
      await journeyStore.loadWayfarersForJourney(id);
      await storyStore.loadAllSpokenNounsForStory(storyId);

      setState(STATE_LOADED);
    }
    loadStory(id, storyId);
  }, [id, storyId, storyStore, journeyStore, setStory, uiStore]);



  return useObserver(() => {
    if (state === STATE_NOT_FOUND) {
      return  <Loading />;
    }
    if (state === STATE_LOADING) {
      return <Loading />;
    }
    return (

      <div className={styles.coreManualWrapper}>
        <div className={styles.coreWrapper}>
          <header className={styles.coreHeader}>
            <button className={styles.headerButton}><BackToJourney id={id} /></button>
            <div className={styles.headerProgressbar}><ProgressFlame /></div>
          </header>

          <div className={styles.wordWheel}>
            {uiStore.currentStory.definedStoryWords[uiStore.currentStory.definedStoryWords.length - 1].isReached === "true" ?

            <div className={styles.coreWrapper}>
             <TheePotLink text="Add story to journey" linkTo={ROUTES.journeyDetail.to + uiStore.currentJourney.id} />
             </div>
            :<Wordwheel /> }
        
          </div>
      
          <div className={styles.manualWrapper}>
            <button className={styles.manualButton} onClick={showManual}>
              <img className={styles.manualArrow} alt="icon of down arrow" src="/assets/img/BUTTONS/downarr.svg" />
              {!uiStore.manualVisibility ? <p className={styles.manualButtonText}>How to tell a story?</p> : ""}
          </button>
          </div>
        </div>

        <div className={styles.overlay}>
          {uiStore.manualVisibility ? <Manual /> : ""}
        </div>
      </div>
    );
  });
};


export default Core;