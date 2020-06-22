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
  const { uiStore, roleStore, clanMemberStore } = useStore()

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
        <BackToWorldButton linkTo={ROUTES.home} />
        <div className={styles.progres}>
          <p className={styles.progresTitle}>Preparing the journey</p>
          <img className={styles.progresImg} src="assets/img/PROGRESS/3of3.svg" alt="Preparing the journey: Explore roles" />
          <p className={styles.select}>Select wayfarers</p>
          <p className={styles.choose}>Choose roles</p>
          <p className={styles.explore}>Explore roles</p>
        </div>
        <PageTitle title={"Your Roles"} subtext={"Discover your role and its power, which can be used during the storytelling of your journey"} />
      </header>

      <ul className={styles.roles}>

        {uiStore.currentJourney ?
          uiStore.currentJourney.wayfarers.map(wayfarer => (
            <>
              <Roleitem wayfarer={wayfarer} />
            </>
          )) : "loading"}

      </ul>

      <div className={styles.next}>
        <button onClick={setJourneyWithWayfarers}>
          <TheePotFlow text={"Set journey"} />
        </button>
      </div>
    </div>

  ));
};

ExploreRoles.propTypes = {

};

export default ExploreRoles;
