import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
//import PropTypes from "prop-types";

import PageTitle from "../../components/PageTitle/PageTitle"
import NewStoryButton from "../../components/buttons/NewStory/NewStory"
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";

import BackToWorldButton from "../../components/buttons/BackToWorld/BackToWorldButton";
import TheePotLink from "../../components/buttons/Algemeen/TheePotLink";

import { useParams } from "react-router-dom";
import Mask from "../../components/Mask";
import Loading from "../../components/Loading";
import ClanStore from "../../stores/ClanStore";



const JourneyDetail = () => {
  const STATE_LOADING = 'loading';
  const STATE_NOT_FOUND = 'notFound';
  const STATE_LOADING_MORE_DETAILS = 'loading more details';
  const STATE_FULLY_LOADED = 'fully loaded';

  const { journeyStore, clanMemberStore, uiStore, clanStore, roleStore } = useStore();
  const { id } = useParams(); // check

  const [journey, setJourney] = useState(journeyStore.resolveJourney(id));
  const [state, setState] = useState(STATE_LOADING);


  useEffect(() => {

    const loadJourneyy = async (id) => {

      try {

        const journey = await journeyStore.loadJourney(id);

        if (!journey) {
          setState(STATE_NOT_FOUND);
          return;
        }
        setJourney(journey);
        setState(STATE_LOADING_MORE_DETAILS);
        await clanStore.loadClanMembers(uiStore.currentClan.id);
        await journeyStore.loadWayfarersForJourney(id);
        setState(STATE_FULLY_LOADED);

      }
      catch (error) {
        setState(STATE_NOT_FOUND);
      }
    }
    loadJourneyy(id);
  }, [id, journeyStore]);


  console.log(journey.wayfarers);

  return useObserver(() => {
    if (state === STATE_NOT_FOUND) {
      return <p>Group not found"</p>;
    }
    if (state === STATE_LOADING) {
      return <p>Loading"</p>;;
    }
    return (
      <div>
        {journey.name !== "Your journey" ? <BackToWorldButton /> : <TheePotLink linkTo={journey.id + `${ROUTES.nameJourney.to}`} text={"Name Journey"} />}

        <PageTitle title={journey.name} subtext={"Start your storytelling with a bonfire"} />


        {journey.wayfarers.map(wayfarer => (
          <>
            <Mask clanMember={clanMemberStore.resolveClanMember(wayfarer.clanMemberId)} />
            <p>{roleStore.resolveRole(wayfarer.roleId.id).roleName}</p>
          </>
        ))}

        <NewStoryButton text={"Start new Story"} />

      </div>


    );
  });
};

JourneyDetail.propTypes = {

};

export default JourneyDetail;
