import React, { useState } from "react";
import styles from "./NameJourney.module.css"
import PageTitle from "../PageTitle/PageTitle"
import TheePotLink from "../buttons/Algemeen/TheePotLink"
import { ROUTES, STATES } from "../../consts/index"
import { useStore } from "../../hooks";
import { useParams } from "react-router-dom";

const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(10));
};

const randomWorldImage = `/assets/img/Worlds/world${getRandomInt()}.svg`;
console.log("randomWorldImage", randomWorldImage)

const NameJourney = () => {

  const [journeyName, setJourneyName] = useState("");

  const { journeyStore, launchFlowStore } = useStore();
  const { id } = useParams();

  const handleFormSubmit = e => {
    e.preventDefault();
    if (journeyName !== "") {

      const journey = journeyStore.resolveJourney(id);

      journey.gridRow = getRandomInt()
      journey.gridColumn = getRandomInt()

      journey.setJourneyName(journeyName);
      journey.setImage(randomWorldImage);

      journey.update();

      launchFlowStore.setHomeStrate(STATES.HOME_STATE_HOME)

    }
  }

  return (
    <div className={styles.wrapper}>
      <PageTitle title={"Give your journey a name"} />

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
        <TheePotLink text="Back to world" linkTo={ROUTES.home} />
      </button>
    </div>
  );
};

export default NameJourney;


