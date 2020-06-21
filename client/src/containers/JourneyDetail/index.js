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

const JourneyDetail = () => {
  const { journeyStore, clanMemberStore, uiStore, roleStore } = useStore();
  const { id } = useParams();

  const journey = journeyStore.resolveJourney(id);

  const wayfarersOfJourney = journeyStore.loadJourneyWayfarers();
  console.log(wayfarersOfJourney);

  return (
    <div>
      {journey.name !== "Your journey" ? <BackToWorldButton /> : <TheePotLink linkTo={`${journey.id}` + ROUTES.nameJourney} text={"Name Journey"} />}

      <PageTitle title={journey.name ? journey.name : "Your Journey"} subtext={"Start your storytelling with a bonfire"} />


      {journey.wayfarers.map(wayfarer => (
        <>
          <Mask clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)} />
          <p>{roleStore.resolveRole(wayfarer.roleId).roleName}</p>
        </>
      ))}

      <NewStoryButton text={"Start new Story"} />

    </div>

  );
};

JourneyDetail.propTypes = {

};

export default JourneyDetail;
