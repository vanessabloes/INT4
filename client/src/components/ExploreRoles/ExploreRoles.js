import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";



const ExploreRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()
 
 
  return useObserver (() => (
    <>
   <p>explore roles</p>


  </>

  
  ));
};

ExploreRoles.propTypes = {

};

export default ExploreRoles;
