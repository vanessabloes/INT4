import React, { useEffect, useState } from "react";

import { ROUTES } from "../../consts";
//import PropTypes from "prop-types";

import PageTitle from "../../components/PageTitle/PageTitle"
import NewStoryButton from "../../components/buttons/NewStory/NewStory"
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";

import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";

import { useParams } from "react-router-dom";

import styles from "./JourneyDetail.module.css";
import MaskNoName from "../../components/MaskNoName";

const JourneyDetail = () => {
  const STATE_LOADING = 'loading';
  const STATE_NOT_FOUND = 'notFound';
  const STATE_LOADING_MORE_DETAILS = 'loading more details';
  const STATE_FULLY_LOADED = 'fully loaded';

  const { journeyStore, clanMemberStore, uiStore, clanStore, roleStore, definedStoryWordStore } = useStore();
  const { id } = useParams(); // check

  const [journey, setJourney] = useState(journeyStore.resolveJourney(id));
  const [state, setState] = useState(STATE_LOADING);

  // const makeNewStory = () => {
  //   const story = new StoryModel({
  //     store: storyStore,
  //     journeyId: id
  //   })
  // }

  useEffect(() => {

    const loadJourneyy = async (id) => {

      //try {
      console.log(id)

      const journey = await journeyStore.loadJourney(id);
      uiStore.setCurrentJourney(journey);
      const lol = await definedStoryWordStore.loadAllDefinedStoryWords();
      // console.log(lol)
      console.log(journey)
      if (!journey) {
        setState(STATE_NOT_FOUND);
        return;
      }
      setJourney(journey);
      setState(STATE_LOADING_MORE_DETAILS);


      await clanStore.loadClanMembers(uiStore.currentClan.id);
      await journeyStore.loadWayfarersForJourney(id);
      await journeyStore.loadStoriesForJourney(id);
      setState(STATE_FULLY_LOADED);
      //  }

      //    catch (error) {
      //      console.log("error")
      //      setState(STATE_NOT_FOUND);
      //    }
    }
    loadJourneyy(id);
  }, [id, journeyStore]);

  return useObserver(() => {
    if (state === STATE_NOT_FOUND) {
      return <p>Group not found"</p>;
    }
    if (state === STATE_LOADING) {
      return <p>Loading"</p>;;
    }
    return (
      <div className={styles.pageWrapper}>

        <div className={styles.journeyInfo}>
          <div className={styles.journeyInfoButton}>
            {journey.name !== "Your journey" ? <BackToWorldButton /> : <TheePotLink linkTo={journey.id + `${ROUTES.nameJourney.to}`} text={"Name Journey"} />}
          </div>
          <div className={styles.journeyInfoTitle}>
            <PageTitle title={journey.name} subtext={"A place of storytelling, magic and wonders. Get your clan together around a bonfire and share & experience your stories"} />
          </div>
        </div>

        <div className={styles.wayfarers}>
          {journey.wayfarers.map(wayfarer => (
            <div key={wayfarer.id} className={styles.wayfarer}>
              <MaskNoName key={wayfarer.id} clanMember={wayfarer} />
              <h1>{wayfarer.name}</h1>
              <p>{roleStore.resolveRole(wayfarer.roleId).roleName}</p>
            </div>
          ))}
        </div>
        <div>
          <NewStoryButton text={"Start new Story"} id={id} />
        </div>


        <ul className={styles.grid}>
          {journey.stories.map(story => (

              <li key={story.id}>
              <img src="assets/img/BUTTONS/btnRestartStory.svg" alt="" />
              <p>{"Your story"}</p>

            </li>
          ))}
        </ul>

        
      </div>


    );
  });
};

JourneyDetail.propTypes = {

};

export default JourneyDetail;
