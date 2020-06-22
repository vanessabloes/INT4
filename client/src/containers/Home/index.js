import React, { useState } from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import ClanMemberStore from "../../stores/ClanMemberStore";
import OpeningScreen from "../../components/OpeningScreen/OpeningScreen";
import OpeningSurrealWorld from "../../components/OpeningSurrealWorld/OpeningSurrealWorld";
import OpeningFamily from "../../components/OpeningFamily/OpeningFamily";
import PageTitle from "../../components/PageTitle/PageTitle";
import StartJourneyButton from "../../components/buttons/StartJourney/StartJourneyButton";
import MyClanCircle from "../../components/MyClanCircle/";

import { STATES } from "../../consts/index";
import styles from "./Home.module.css"
import World from "../../components/World/World"
import { Link } from "react-router-dom";


const Home = ({ page }) => {
  const { launchFlowStore, clanStore, uiStore } = useStore()

  const [homeState, setState] = useState();

console.log(uiStore.currentClan)
 // const journeysOfClan = clanStore.loadClanJourneys(uiStore.currentClan.id);

  return useObserver(() => {

    if (launchFlowStore.homeState === STATES.HOME_STATE_OPENING_SCREEN) {// "Opening Screen"
      return <OpeningScreen onClick={setState} />
    }

    if (launchFlowStore.homeState === STATES.HOME_STATE_FAMILY) {// "Opening Family"
      return <OpeningFamily />
    }

    if (launchFlowStore.homeState === STATES.HOME_STATE_SURREAL_WORLD) {//"Opening Surreal World",
      return <OpeningSurrealWorld />;
    }

    return (

          

      <div className={styles.home_wrapper}>
        <PageTitle title={"Uncover your world"} subtext={"Go on an adventurious journey with the clan and reveal all the parts of your wolrd bit by bit"} />
        <MyClanCircle page={page} clan={uiStore.currentClan} />

        <div className={styles.worlds_wrapper}>
          {
            uiStore.currentClan.journeys.map(journey => (
              <Link to={journey.id}>
                <World journey={journey} />
              </Link>
            ))
          }
        </div> 
        <StartJourneyButton />

      </div>

    );

  });
};

Home.propTypes = {

};

export default Home;
