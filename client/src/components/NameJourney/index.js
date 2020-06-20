import React, { useState } from "react";
import styles from "./NameJourney.module.css"
import PageTitle from "../PageTitle/PageTitle"
import TheePotFlow from "../buttons/Algemeen/TheePotFlow"
import {ROUTES} from "../../consts/index"
import { useStore } from "../../hooks";
import { useParams } from "react-router-dom";
import JourneyModel from "../../models/JourneyModel"

  const getRandomInt = () => {
    return Math.floor(Math.random() * Math.floor(10));
  };

  const randomWorldImage = `/assets/img/Worlds/world${getRandomInt()}.svg`;
  console.log("randomWorldImage", randomWorldImage)  

const NameJourney = () => {
  
  const [journeyName, setJourneyName] = useState("");
  const { journeyStore } = useStore();
  const { id } = useParams();
  
  const handleFormSubmit = e => {    
    console.log("NameJourney");
    e.preventDefault();
    console.log("handleFormSubmit")
    if (journeyName !== "") {
      const journey = journeyStore.resolveJourney(id);

      journey.name = journeyName
      journey.gridRow = getRandomInt()
      journey.gridColumn = getRandomInt()
      journey.image = randomWorldImage
    
      console.log(journey)
      journey.update();
      setJourneyName("");

      
    }
  }  
  
  return (
    <div className={styles.wrapper}>
      <PageTitle title={"Give your journey a name"}/>

      <div className={styles.form_wrapper}>
        <img className={styles.world_image} src={randomWorldImage} alt="A new world" />

        <form >
          <input
            className={styles.input}
            id="Journey name"
            name="journeyName"
            placeholder="Give your journey a name"
            value={journeyName}
            onChange={e => setJourneyName(e.currentTarget.value)}
            size="30"
          />
        </form>

      </div>
      <button
        className={styles.button} 
        type="button"
        value="challenge"
        onClick={handleFormSubmit}>
        <TheePotFlow text="Back to world" />
        </button>
    </div>
  );
};

export default NameJourney;


