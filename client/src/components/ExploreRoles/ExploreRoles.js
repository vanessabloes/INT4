import React from "react";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";

import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import { ROUTES } from "../../consts";

import { useHistory } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";
import styles from "./ExploreRoles.module.css"
import BackToWorldButton from "../buttons/BackToWorld/BackToWorldButton";
import Roleitem from "../Roleitem";


const ExploreRoles = () => {
  const { uiStore } = useStore()

  const history = useHistory();
  const setJourneyWithWayfarers = async () => {

    console.log("hey")
    await uiStore.currentJourney.create();
    await uiStore.currentJourney.wayfarers.forEach(wayfarer => {
      wayfarer.create();
    });
    history.push(ROUTES.journeyDetail.to + uiStore.currentJourney.id);
  }

  return useObserver(() => (

    <div className={styles.pagewrapper}>

      <header className={styles.header}>
        <div className={styles.headerButton}>
          <BackToWorldButton linkTo={ROUTES.home} />
        </div>
        <div className={styles.progres}>
          <p className={styles.progresTitle}>Preparing the journey</p>
          <img className={styles.progresImg} src="assets/img/PROGRESS/3of3.svg" alt="Preparing the journey: Explore roles" />
          <p className={styles.select}>Select wayfarers</p>
          <p className={styles.choose}>Choose roles</p>
          <p className={styles.explore}>Explore roles</p>
        </div>
        <div className={styles.headerTitle}>
          <PageTitle title={"Your Roles"} subtext={"Discover your role and its power, which can be used during the storytelling of your journey"} />
        </div>
      </header>

      <ul className={styles.roles}>

        {uiStore.currentJourney ?
          uiStore.currentJourney.wayfarers.map(wayfarer => (
            <>
              <Roleitem wayfarer={wayfarer} />
            </>
          )) : "loading"}

      </ul>

        <button className={styles.buttonNext} onClick={setJourneyWithWayfarers}>
          <TheePotFlow text={"Set journey"} />
        </button>

    </div>

  ));
};

ExploreRoles.propTypes = {

};

export default ExploreRoles;
