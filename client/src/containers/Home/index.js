import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import OpeningScreen from "../../components/OpeningScreen/OpeningScreen";
import OpeningSurrealWorld from "../../components/OpeningSurrealWorld/OpeningSurrealWorld";
import OpeningFamily from "../../components/OpeningFamily/OpeningFamily";
import PageTitle from "../../components/PageTitle/PageTitle";
import StartJourneyButton from "../../components/buttons/StartJourney/StartJourneyButton";
import MyClanCircleTiny from "../../components/MyClanCircleTiny/";

import { STATES } from "../../consts/index";
import styles from "./Home.module.css"
import World from "../../components/World/World"
import { Link } from "react-router-dom";
import ProgressFlame from "../../components/ProgressFlames";
import Manual from "../../components/Manual";


const Home = ({ page }) => {
  const { launchFlowStore, uiStore } = useStore()

  const [homeState, setState] = useState();

  //   useEffect(() =>
  //   localStorage.removeItem("launch_page")
  // );

  //console.log(uiStore.currentClan)
  // const journeysOfClan = clanStore.loadClanJourneys(uiStore.currentClan.id);

  return useObserver(() => {

    if (launchFlowStore.homeState === STATES.HOME_STATE_OPENING_SCREEN) {// "Opening Screen"
      return <OpeningScreen onClick={setState} />
    }

    if (launchFlowStore.homeState === STATES.HOME_STATE_FAMILY) {// "Opening Family"

      return <OpeningFamily />

      // <OpeningFamily />
      // return <Challenge /> 
      // <Manual />
    }



    if (launchFlowStore.homeState === STATES.HOME_STATE_SURREAL_WORLD) {//"Opening Surreal World",
      return <OpeningSurrealWorld />;
    }

    return (

      <div className={styles.home_wrapper}>

        <div className={styles.homeTitle}>
          <PageTitle title={"Uncover your world"} subtext={"Go on adventurious journeys with your clan and reveal all parts of your imaginary world bit by bit"} />
        </div>


        <div className={styles.worlds_wrapper}>
          {uiStore.currentClan.journeys.length > 3 ? <div className={styles.arrow}>&lsaquo;</div> : ""}


          {
            uiStore.currentClan.journeys.map(journey => (
              <Link to={journey.id} key={journey.id}>
                <World journey={journey} />
              </Link>
            ))
          }
          {uiStore.currentClan.journeys.length > 3 ? <div className={styles.arrow}>&rsaquo;</div> : ""}

        </div>

        <div className={styles.homeClan}>
          {uiStore.currentClan.clanMembers.length === 0 ? <p className={styles.homeClanInfo}>Add some family members and become a clan!</p> : ""}
          <MyClanCircleTiny page={page} clan={uiStore.currentClan} />
        </div>

        <div className={styles.homeButton}>
          <StartJourneyButton />
        </div>

      </div>

    );
        
  });
};

Home.propTypes = {

};

export default Home;
