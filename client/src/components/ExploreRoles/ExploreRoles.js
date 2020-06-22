import React from "react";
//import { Link } from "react-router-dom";
//import PropTypes from "prop-types";
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";

import TheePotFlow from "../../components/buttons/Algemeen/TheePotFlow";
import { ROUTES } from "../../consts";
import JourneyModel from "../../models/JourneyModel";
import JourneyStore from "../../stores/JourneyStore";
import Mask from "../Mask";
import { useHistory } from "react-router-dom";
import PageTitle from "../PageTitle/PageTitle";


const ExploreRoles = () => {
  const { uiStore, roleStore, clanMemberStore } = useStore()

  const history = useHistory();
  const setJourneyWithWayfarers = async () => {
 
    console.log("hey")
   await  uiStore.currentJourney.create();
    await uiStore.currentJourney.wayfarers.forEach(wayfarer => {
       wayfarer.create();
    });
    history.push(ROUTES.journeyDetail.to + uiStore.currentJourney.id);
  }

  return useObserver(() => (
    <>
      

    <PageTitle title={"Your Roles"} subtext={"Discover the powers of your roles"} />
      <ul >
        Dit zijn alle clanMembers van de current clan:

          {uiStore.currentJourney ?
          uiStore.currentJourney.wayfarers.map(wayfarer => (
            <>
              <Mask clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)} />
              <p>{roleStore.resolveRole(wayfarer.roleId).roleName}</p>
            </>
          )) : "loading"}

      </ul>

      <button onClick={setJourneyWithWayfarers}>
       <TheePotFlow text={"Set journey"}/>
      </button>
    </>

  ));
};

ExploreRoles.propTypes = {

};

export default ExploreRoles;
