import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import PageTitle from "../../components/PageTitle/PageTitle"

import AddMemberButton from "../../components/buttons/AddMember/AddMemberButton"
import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow"
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink"
import StartJourneyButton from "../../components/buttons/StartJourney/StartJourneyButton"
import MyclanButton from "../../components/buttons/MyClan/MyclanButton"
import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton"
import { ROUTES } from "../../consts"


const AddJourney = () => {
  return (

    <>
   <p>AddJourney</p>


    
    
    <PageTitle title={"Who joins the journey?"} subtext={"dit is een zin voor in de subtext veel plezier ermee"}/>

  
  <AddMemberButton text={"Add"} linkTo={ROUTES.home}/>
  <BackToWorldButton text={"dit is een test"} linkTo={ROUTES.home}/>
  <TheePotLink text={"dit is een test"} linkTo={ROUTES.home}/>
  <MyclanButton/>
  <StartJourneyButton/>
  </>
  );
};

AddJourney.propTypes = {

};

export default AddJourney;
