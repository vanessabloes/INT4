import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";



const ChooseRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore } = useStore()
 
 
  return useObserver (() => (
    <>
   <p>hello world</p>


  </>

  
  ));
};

ChooseRoles.propTypes = {

};

export default ChooseRoles;
