import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../consts";
//import PropTypes from "prop-types";

import PageTitle from "../../components/PageTitle/PageTitle"
import NewStoryButton from "../../components/buttons/NewStory/NewStory"
import Masklayout from "../../components/MaskLayout/index"
import { useStore } from "../../hooks";
import { useObserver } from "mobx-react-lite";


const JourneyDetail = () => {
  return (
    <>
     <PageTitle title={"Journey 1"} subtext={"Start your storytelling with a bonfire"}/>
      <Masklayout></Masklayout>
      <NewStoryButton text={"Start new Story"}/>

     
    </>

  );
};

JourneyDetail.propTypes = {

};

export default JourneyDetail;
