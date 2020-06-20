import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { STATES } from "../../consts";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Box from "../Box";

const ChooseRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()
 
  const linkRole = () => {
    
  }

  const loadRoles = () => {
    let uniqueRoles = [];

      console.log("loaded")
      console.log(roleStore.roles[0]) // = roleModel
      console.log(roleStore.roles.length); // = 1
      console.log(uniqueRoles.length) // = O
      for (let index = 0; uniqueRoles.length < 1; index++) {

          const randomRole = roleStore.roles[Math.floor(Math.random() * (roleStore.roles.length - 1))];
  
      console.log(randomRole)
        uniqueRoles.push(randomRole);
        console.log(uniqueRoles)
    }
   

    
      
  }

  loadRoles();


  return useObserver (() => (
    <>
   <p>choose roles</p>

 
    {uiStore.currentJourney.wayfarers.map(wayfarer => (
      <p onClick={linkRole}>{wayfarer.id}</p>
    ))}
  



  
   <TheePotFlow text={"Explore roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_EXPLOREROLES)}/>

  </>

  
  ));
};

ChooseRoles.propTypes = {

};

export default ChooseRoles;
