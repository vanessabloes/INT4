import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";

import PageTitle from "../../../components/PageTitle/PageTitle"

import AddMemberButton from "../../../components/buttons/AddMember/AddMemberButton"
import ButtonAlgemeen from "../../../components/buttons/Algemeen/AlgemeenButton"
import StartJourneyButton from "../../../components/buttons/StartJourney/StartJourneyButton"
import MyclanButton from "../../../components/buttons/MyClan/MyclanButton"
import BackToWorldButton from "../../../components/buttons/BackToWorld/BackToWorldButton"
import { ROUTES } from "../../../consts";

const AddJourney = () => {
  return (

    <>
   <p>AddJourney</p>




    <PageTitle title={"Test titel"}/>
   {/* <AddMemberButton text={"Add"} linkTo={ROUTES.home}/>
   <BackToWorldButton text={"dit is een test"} linkTo={ROUTES.home}/>
   <ButtonAlgemeen text={"dit is een test"} linkTo={ROUTES.home}/>
   <MyclanButton/>
   <StartJourneyButton/> */}
   </>
  );
};

AddJourney.propTypes = {

};

export default AddJourney;
