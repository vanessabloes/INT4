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
import {STATES} from "../../consts/index";


const Home = () => {
  const { launchFlowStore } = useStore()
  
  


  const [homeState, setState] = useState();

  return useObserver (() => {

    if (launchFlowStore.homeState === STATES.HOME_STATE_OPENING_SCREEN) {  
      return <OpeningScreen onClick={setState}/> 
    }
    
    if(launchFlowStore.homeState === STATES.HOME_STATE_FAMILY) {
      return <OpeningFamily />
    }

    if (launchFlowStore.homeState === STATES.HOME_STATE_SURREAL_WORLD) {
      return <OpeningSurrealWorld />;
    }


    return (
      <>
       {/* standaard home component */}
        <PageTitle title={"Uncover your world"} subtext={"Go on an adventurious journey with the clan and reveal all the parts of your wolrd bit by bit"}/>
        <StartJourneyButton/>

      </>
    );
      
  });
};

Home.propTypes = {

};

export default Home;
