import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";

import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";
import { ROUTES } from "../../consts";
import JourneyModel from "../../models/JourneyModel";
import JourneyStore from "../../stores/JourneyStore";


const ExploreRoles = () => {
  const { uiStore, roleStore, clanStore, clanMemberStore, journeyStore } = useStore()

  return useObserver(() => (
    <>
      <p>explore roles</p>
      <TheePotLink text={"Set Journey"} linkTo={ROUTES.journeyDetail.to + `${uiStore.currentJourney.id}`} />

    </>


  ));
};

ExploreRoles.propTypes = {

};

export default ExploreRoles;
