import React from "react";
import styles from "./StartJourney.module.css"
import { Link } from "react-router-dom";
import { ROUTES } from "../../../consts";

import { ReactComponent as Button } from './btnNewJourney.svg';

import { useStore } from "../../../hooks";
import JourneyModel from "../../../models/JourneyModel";

const StartJourneyButton = () => {

  const { journeyStore, uiStore } = useStore();

  const addNewJourney = () => {
    const newJourney = new JourneyModel({
     // name: "Your journey",
     // image: "Unproccesed image",
      clanId: uiStore.currentClan.id,
      store: journeyStore
    })

    if (newJourney) {
      console.log(newJourney);
      uiStore.setCurrentJourney(newJourney);
    } else {
      console.log("no new journey");
    }

    // if (uiStore.currentJourney != undefined) {
    //   journeyStore.loadJourney(uiStore.currentJourney.id);
    //   //console.log("HET LUUUUUKT");
    // } else {
    //   // console.log("geen current clan defined!");
    //   console.log(uiStore.currentJourney);
    // }


  }

  return (
    <div className={styles.buttonContainer}>
      <Link className={styles.button} to={ROUTES.addJourney}>
        <Button onClick={addNewJourney} />
      Start new Journey
    </Link>
    </div>
  );
};

export default StartJourneyButton;


