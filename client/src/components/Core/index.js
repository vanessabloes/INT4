import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react-lite";

import Wordwheel from "../Wordwheel";

import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

import { STATES } from "../../consts";
import Manual from "../Manual";
import PageTitle from "../PageTitle/PageTitle";
import { useParams } from "react-router-dom";
import ProgressFlame from "../ProgressFlames";

import styles from "./Core.module.css";
import BackToJourney from "../buttons/BackToJourney/BackToJourney";


const Core = () => {


  const showManual = () => {
    uiStore.setManualVisibility(true);
  }

  const { uiStore, journeyStore, storyStore } = useStore();
  const { id, storyId } = useParams();
  const STATE_LOADING = 'loading';
  const STATE_NOT_FOUND = 'notFound';
  const STATE_LOADING_MORE_DETAILS = 'loading more details';
  const STATE_FULLY_LOADED = 'fully loaded';

  const [story, setStory] = useState(storyStore.resolveStory(storyId));
  const [state, setState] = useState(STATE_LOADING);



  useEffect(() => {

    const loadStory = async (id, storyId) => {

      //  try{
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

      setState(STATE_LOADING_MORE_DETAILS);
      // await storyStore.loadDefinedStoryWordsForStory(storyId);
      //const generatedName = `from `+  story.definedStoryWords[0].content + ` to ` + story.definedStoryWords[story.definedStoryWords.length - 1].content;
      // await story.updateFromJson({
      //   name: generatedName
      // });
      // console.log(story);
      // await story.update();
      setStory(story);
      await journeyStore.loadWayfarersForJourney(id);
      await storyStore.loadAllSpokenNounsForStory(storyId);



      setState(STATE_FULLY_LOADED);
      //  }

      //    catch (error) {
      //      console.log("error")
      //      setState(STATE_NOT_FOUND);
      //    }
    }
    loadStory(id, storyId);
  }, [id, storyId, storyStore, journeyStore, setStory]);




  return useObserver(() => {
    if (state === STATE_NOT_FOUND) {
      return <p>Story not found"</p>;
    }
    if (state === STATE_LOADING) {
      return <p>Loading"</p>;;
    }
    return (

      <div className={styles.coreManualWrapper}>
        <div className={styles.coreWrapper}>

          <header className={styles.coreHeader}>
            <button className={styles.headerButton}><BackToJourney id={id} /></button>
            <div className={styles.headerProgressbar}><ProgressFlame /></div>
          </header>

          <div className={styles.wordWheel}>
            <Wordwheel />
          </div>

          <div className={styles.manualWrapper}>

            <button className={styles.manualButton} onClick={showManual}> <img className={styles.manualArrow} alt="icon of down arrow" src="/assets/img/BUTTONS/downarr.svg" />{!uiStore.manualVisibility ? <p className={styles.manualButtonText}>How to tell a story?</p> : ""}</button>

          </div>

        </div>

        <div className={styles.overlay}>{uiStore.manualVisibility ? <Manual /> : ""}</div>

      </div>
    );
  });
};


export default Core;