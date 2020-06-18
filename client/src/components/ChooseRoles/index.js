import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";
import { STATES } from "../../consts";
import TheePotFlow from "../buttons/Algemeen/TheePotFlow";



const ChooseRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()
 
 
  return useObserver (() => (
    <>
   <p>choose roles</p>

   <TheePotFlow text={"Explore roles"} onClick={e => uiStore.setAddJourneyState(STATES.ADDJOURNEY_STATE_EXPLOREROLES)}/>

  </>

  
  ));
};

ChooseRoles.propTypes = {

};

export default ChooseRoles;
