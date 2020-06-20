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

const JourneyDetail = () => {
  const { journeyStore } = useStore();
  const { id } = useParams();

  const journey = journeyStore.resolveJourney(id);

  return (
    <div>
      {journey.name ? <BackToWorldButton /> : <TheePotLink text={"Name Journey"} />}
      <PageTitle title={journey.name ? journey.name : "Your Journey"} subtext={"Start your storytelling with a bonfire"} />
      <Masklayout></Masklayout>
      <NewStoryButton text={"Start new Story"} />

    </div>

  );
};

JourneyDetail.propTypes = {

};

export default JourneyDetail;
