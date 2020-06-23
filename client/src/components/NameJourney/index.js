import React, { useState } from "react";
import { useObserver } from "mobx-react-lite";
import styles from "./NameJourney.module.css"
import PageTitle from "../PageTitle/PageTitle"
import { ROUTES, STATES } from "../../consts/index"
import { useStore } from "../../hooks";
import { useParams } from "react-router-dom";
import BackToWorldButton from "../buttons/BackToWorld/BackToWorldButton";

const getRandomInt = () => {
  return Math.floor(Math.random() * Math.floor(10));
};

const randomWorldImage = `/assets/img/Worlds/world${getRandomInt()}.svg`;
console.log("randomWorldImage", randomWorldImage)

const NameJourney = () => {

  const [journeyName, setJourneyName] = useState("");
  const [btw, setBtw] = useState(false);

  const { journeyStore, launchFlowStore } = useStore();
  const { id } = useParams();

  const handleFormSubmit = e => {
    e.preventDefault();

    if (journeyName !== "") {

      const journey = journeyStore.resolveJourney(id);
      journey.gridRow = getRandomInt();
      journey.gridColumn = getRandomInt();
      journey.setJourneyName(journeyName);
      journey.setImage(randomWorldImage);
      journey.update();

      setBtw(true);
      launchFlowStore.setNameJourneyError("");
      launchFlowStore.setHomeStrate(STATES.HOME_STATE_HOME);

    } else {
      launchFlowStore.setNameJourneyError("Please fill in a journey name");
    }
  }

  return useObserver(() => (
    <div className={styles.wrapper}>

      <div className={styles.title}>
        <PageTitle title={"Give your journey a name"} />
      </div>

      <div className={styles.form_wrapper}>
        <img className={styles.world_image} src={randomWorldImage} alt="A new world" />

        <form onSubmit={e => handleFormSubmit(e)} >
          <label className={styles.labelWrapper}>
            <span className={styles.spanName}>Name of journey</span>
            <input
              className={styles.input}
              id="Journey name"
              name="journeyName"
              placeholder="Give your journey a name"
              value={journeyName}
              onChange={e => setJourneyName(e.currentTarget.value)}
              size="30"
            />
          </label>

          <p className={styles.error}>{launchFlowStore.journeyNameError}</p>

          {!btw ?
            <label className={styles.theepot}>
              <input
                className={styles.button}
                type="submit"
                value=""
              />
              <p>Name journey</p>
            </label>
            : <div className={styles.btw}><p>New journey created!</p> <BackToWorldButton linkTo={ROUTES.home} /> </div>}
        </form>
      </div>

    </div>
  ));
};

export default NameJourney;


