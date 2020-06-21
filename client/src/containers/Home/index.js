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
import {STATES} from "../../consts/index";
import styles from  "./Home.module.css"
import World from  "../../components/World/World"
import BackToJourney from "../../components/buttons/BackToJourney/BackToJourney";



const Home = ({ page }) => {
  const { launchFlowStore } = useStore()
  
  const [homeState, setState] = useState();

  const testClan = [
    {id: 1, name: "piet", avatar: "/assets/img/testmasks/testmask1.svg"},
    {id: 2, name: "jan", avatar: "/assets/img/testmasks/testmask2.svg"} ,
    {id: 3, name: "jos", avatar: "/assets/img/testmasks/testmask3.svg" },
    {id: 4, name: "fret", avatar: "/assets/img/testmasks/testmask4.svg"}
  ]
  const testworlds = [
    {id: 1, name: "De mooiste wereld van de wereld", image: "/assets/img/Worlds/world1.svg"},
    {id: 2, name: "snoep wereld", image: "/assets/img/Worlds/world2.svg"} ,
    {id: 3, name: "wereld der werelden van de wereld", image: "/assets/img/Worlds/world3.svg" },
    {id: 4, name: "fret de planeet", image: "/assets/img/Worlds/world9.svg"}
  ]


  return useObserver (() => {

   if (launchFlowStore.homeState === STATES.HOME_STATE_OPENING_SCREEN) {// "Opening Screen"
      return <OpeningScreen onClick={setState}/> 
    }
    
    if(launchFlowStore.homeState === STATES.HOME_STATE_FAMILY) {// "Opening Family"
      return <OpeningFamily />
    }

    if (launchFlowStore.homeState === STATES.HOME_STATE_SURREAL_WORLD) {//"Opening Surreal World",
      return <OpeningSurrealWorld />;
    }

    return (
    

      
        <div className={styles.home_wrapper}>
          <PageTitle title={"Uncover your world"} subtext={"Go on an adventurious journey with the clan and reveal all the parts of your wolrd bit by bit"}/>
          <MyClanCircle page={page} clan={testClan}/> 

          <div className={styles.worlds_wrapper}>
            {
              testworlds.map(world => (
                <World world={world}/>
              ))
            }
          </div>

          <StartJourneyButton/> 
          
         
        </div>

    );
  
      
     
  

  });
};

Home.propTypes = {

};

export default Home;
