import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
//import PropTypes from "prop-types";

import PageTitle from "../../components/PageTitle/PageTitle"
import NewStoryButton from "../../components/buttons/NewStory/NewStory"
import Masklayout from "../../components/MaskLayout/index"
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";

import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";

import { useParams } from "react-router-dom";
import Mask from "../../components/Mask";
import ClanMemberStore from "../../stores/ClanMemberStore";


const JourneyDetail =() => {

  const { journeyStore, clanMemberStore, uiStore, roleStore } = useStore();
  const { id } = useParams();

  console.log(id);
  const journey = journeyStore.resolveJourney(id);
  console.log(journey);

  const wayfarersOfJourney = journeyStore.loadJourneyWayfarers(id);
  console.log(wayfarersOfJourney);

  

  return useObserver(() => (
    <div>
      {journey.name !== "Your journey" ? <BackToWorldButton /> : <TheePotLink linkTo={`${journey.id}` + ROUTES.nameJourney} text={"Name Journey"} />}

      <PageTitle title={journey.name ? journey.name : "Your Journey"} subtext={"Start your storytelling with a bonfire"} />

    {/* {journey ? <p>{journey.name}</p> : <p>GEEN JOURNEY</p>} */}


      {journey !== undefined ? journey.wayfarers.map(wayfarer => (
        <>
          <Mask clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)} />
          {/* <p>{roleStore.resolveRole(wayfarer.roleId).roleName}</p> */}
        </>
      )) : <p>"loading"</p>}

      <NewStoryButton text={"Start new Story"} />

    </div>

  ));
};

JourneyDetail.propTypes = {

};

export default JourneyDetail;
