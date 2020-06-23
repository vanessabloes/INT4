import React, { useState, useEffect } from "react";
import { useObserver } from "mobx-react-lite";

import Pitstops from "../Pitstops";
import Power from "../Power";
import PowerOverlay from "../PowerOverlay";
import Wordwheel from "../Wordwheel";

import { useStore } from "../../hooks";
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";

import { STATES } from "../../consts";
import Manual from "../Manual";
import PageTitle from "../PageTitle/PageTitle";
import JourneyStore from "../../stores/JourneyStore";
import { useParams } from "react-router-dom";
import ProgressFlame from "../ProgressFlames";




const Core = () => {

    const { uiStore, journeyStore, definedStoryWordStore, storyStore } = useStore();
    const { id, storyId } = useParams();
    const STATE_LOADING = 'loading';
    const STATE_NOT_FOUND = 'notFound';
    const STATE_LOADING_MORE_DETAILS = 'loading more details';
    const STATE_FULLY_LOADED = 'fully loaded';

    const showOverlay = () => {

    }
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
        <>
           <PageTitle title={"Your story"}/>
            <ProgressFlame />
           
            <ul>
            {uiStore.currentJourney.wayfarers.map(wayfarer => (
              
                    <li key={wayfarer.id} onClick={showOverlay} >{wayfarer.id}</li>
                    
                       
               
            ))}
             </ul>

            <Wordwheel />
            <Manual />
            <button
                value="challenge"
                onClick={e => uiStore.setAddStoryState(STATES.ADDSTORY_STATE_CHALLENGE)}>
                <TheePotFlow
                    text="Find your way back" />
            </button>
            <TheePotLink text="Add Story" linkTo={ROUTES.path} />
        </>
       );
    });
  };


export default Core;